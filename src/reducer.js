/* @flow */
import {
  INITIALIZE,
  REGISTER_STEP,
  PREVIOUS_STEP,
  NEXT_STEP,
  DESTROY
} from './actionTypes'

import type { WizardsReducerState, WizardActions } from './types'

export const NAME = 'wizards'

export const initialState = {}

function getCurrentStep (name, state) {
  const wizardState = state[name] || {}
  const currentStep = wizardState.currentStep
  return wizardState.steps[currentStep]
}

function rollbackStackTo (stepName, stack = []) {
  const newStack = [ ...stack ]
  while (newStack.length !== 0) {
    const lastStep = newStack.pop()
    if (lastStep === stepName) {
      return [ ...newStack, stepName ]
    }
  }
  return [ ...stack, stepName ]
}

export default function wizards (
  state: WizardsReducerState = initialState,
  action: ?WizardActions
): WizardsReducerState {
  if (!action) {
    return state
  }

  switch (action.type) {
    case INITIALIZE: {
      const { name, firstStep } = action.payload || {}
      return {
        ...state,
        [name]: {
          currentStep: firstStep,
          steps: {},
          stack: [ firstStep ]
        }
      }
    }
    case REGISTER_STEP: {
      const { name, step } = action.payload || {}
      return {
        ...state,
        [name]: {
          ...state[name],
          steps: {
            ...state[name].steps,
            [step.name]: step
          }
        }
      }
    }
    case PREVIOUS_STEP: {
      const { name } = action.payload || {}
      const currentStep = getCurrentStep(name, state)
      const previousStep = currentStep.previous
      const stack = rollbackStackTo(previousStep, state[name].stack)
      return {
        ...state,
        [name]: {
          ...state[name],
          currentStep: previousStep,
          stack
        }
      }
    }
    case NEXT_STEP: {
      const { name, values = {} } = action.payload || {}
      const currentStep = getCurrentStep(name, state)
      if (currentStep.finish) {
        console.error(`${name} could not progress because it is finished`)
        return state
      }
      // This can't be serialized correctly if it contains a function
      // however we should be able to fix this in a later version.
      const nextStep = typeof currentStep.next === 'function' ? currentStep.next(values, state[name] || {}) : currentStep.next
      if (!nextStep) {
        console.error(`${name} could not progress because the nextStep was null`)
        return state
      }
      const stack = [ ...state[name].stack, nextStep ]
      return {
        ...state,
        [name]: {
          ...state[name],
          currentStep: nextStep,
          stack
        }
      }
    }
    case DESTROY: {
      const { name } = action.payload || {}
      const newState = Object.assign({}, state)
      delete newState[name]
      return newState
    }
    default:
      return state
  }
}
