import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Step from './Step'

import { NAME } from './reducer'
import { initializeWizard, registerStep, previousStep, nextStep, destroyWizard } from './actions'

import type {
  ReactChildren,
  ReactElement,
  KeyValueObject,
  ReduxDispatch,
  ReactReduxConnector,
  WizardActions,
  StepConfiguration,
  WizardsReducerState
} from './types'

type ConnectedWizardProps = {
  name: string,
  children: ReactChildren
}
type WizardProps = {
  name: string,
  currentStepConfiguration: ?StepConfiguration,
  initialize: typeof initializeWizard,
  register: typeof registerStep,
  previous: typeof previousStep,
  next: typeof nextStep,
  destroy: typeof destroyWizard,
  children: ReactChildren,
}

export class Wizard extends Component {

  props: WizardProps

  componentDidMount () {
    const { children, initialize, register, name } = this.props

    const possibleSteps = React.Children.toArray(children).filter(step => step.type === Step)

    const firstStep = possibleSteps.length ? (possibleSteps[0].props || {}).name : null
    initialize(name, firstStep)

    // Ensure steps are registered with previous states when not supplied.
    let previousStepName
    possibleSteps.forEach(
      ({ props = {} }) => {
        register(name, {
          name: props.name,
          previous: props.previous || previousStepName,
          next: props.next,
          finish: !props.next
        })
        previousStepName = props.name
      }
    )
  }

  componentWillUnmount () {
    const { destroy, name } = this.props
    destroy(name)
  }

  handlePrevious = (): void => {
    const { previous, name } = this.props
    previous(name)
  }

  handleNext = (values: ?KeyValueObject = {}): void => {
    const { next, name } = this.props
    next(name, values)
  }

  getCurrentStep = (currentStepConfiguration: StepConfiguration): ?ReactElement => {
    const { children } = this.props

    const possibleSteps = React.Children.toArray(children)
    const currentStep = possibleSteps.find(ps => ps.props.name === currentStepConfiguration.name)
    if (React.isValidElement(currentStep)) {
      return React.cloneElement(currentStep, {
        handlePrevious: currentStepConfiguration.previous && this.handlePrevious,
        handleNext: currentStepConfiguration.next && this.handleNext
      })
    }

    return null
  }

  render () {
    const { currentStepConfiguration } = this.props
    return currentStepConfiguration ? this.getCurrentStep(currentStepConfiguration) : null
  }

}

export function mapStateToProps (
  state: KeyValueObject,
  ownProps: KeyValueObject
) {
  const reducerKey = ownProps.reducerKey || NAME
  if (!(reducerKey in state)) {
    throw new Error(
      `${reducerKey} was not found in state but is required by Wizard.
      Please check your root reducer to ensure it has been setup correctly.
    `)
  }
  const wizardsState: WizardsReducerState = state[reducerKey]

  const name = ownProps.name
  const { currentStep, steps = {} } = wizardsState[name] || {}
  const currentStepConfiguration: ?StepConfiguration = steps[currentStep]

  return {
    name,
    currentStepConfiguration
  }
}

export function mapDispatchToProps (dispatch: ReduxDispatch<WizardActions>) {
  return bindActionCreators({
    initialize: initializeWizard,
    register: registerStep,
    previous: previousStep,
    next: nextStep,
    destroy: destroyWizard
  }, dispatch)
}

const connector: ReactReduxConnector<ConnectedWizardProps, WizardProps> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(Wizard)
