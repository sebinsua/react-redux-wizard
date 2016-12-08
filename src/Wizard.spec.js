/* @flow */
import React, { Element } from 'react'
import { mount } from 'enzyme'

import { Wizard, mapStateToProps, mapDispatchToProps } from './Wizard'
import { Step } from './Step'

function StepOne (): Element<*> {
  return <span>Step 1</span>
}

function StepTwo (): Element<*> {
  return <span>Step 2</span>
}

function StepThree (): Element<*> {
  return <span>Step 3</span>
}

const createProps = () => ({
  name: 'some-wizard',
  initialize: jest.fn(),
  register: jest.fn(),
  previous: jest.fn(),
  next: jest.fn(),
  destroy: jest.fn()
})

test('mapStateToProps() generates valid props', () => {
  const state = {
    wizards: {
      'some-wizard': {
        currentStep: 'step-one',
        steps: {
          'step-one': {
            name: 'step-one',
            previous: null,
            next: 'step-two',
            finish: false
          }
        }
      }
    }
  }
  expect(mapStateToProps(state, { name: 'some-wizard' }))
    .toEqual({
      name: 'some-wizard',
      currentStepConfiguration: {
        name: 'step-one',
        previous: null,
        next: 'step-two',
        finish: false
      }
    })
})

test('mapDispatchToProps() generates valid props', () => {
  const dispatch = v => v
  expect(Object.keys(mapDispatchToProps(dispatch)))
    .toEqual([ 'initialize', 'register', 'previous', 'next', 'destroy' ])
})

test('Wizard will initialise first step on mount', () => {
  const props = createProps()
  mount(
    <Wizard {...props}>
      <Step name='step-one' component={StepOne} next='step-two' />
      <Step name='step-two' component={StepTwo} next='step-three' />
      <Step name='step-three' component={StepThree} />
    </Wizard>
  )

  const initializeCall = props.initialize.mock.calls[0]
  expect(initializeCall).toEqual([ 'some-wizard', 'step-one' ])
})

test('Wizard will register the steps on mount', () => {
  const props = createProps()
  mount(
    <Wizard {...props}>
      <Step name='step-one' component={StepOne} next='step-two' />
      <Step name='step-two' component={StepTwo} next='step-three' />
      <Step name='step-three' component={StepThree} previous='step-one' />
    </Wizard>
  )

  const registerStepCalls = props.register.mock.calls
  expect(registerStepCalls[0]).toEqual([
    'some-wizard',
    {
      name: 'step-one',
      previous: undefined,
      next: 'step-two',
      finish: false
    }
  ])
  expect(registerStepCalls[1]).toEqual([
    'some-wizard',
    {
      name: 'step-two',
      previous: 'step-one',
      next: 'step-three',
      finish: false
    }
  ])
  expect(registerStepCalls[2]).toEqual([
    'some-wizard',
    {
      name: 'step-three',
      previous: 'step-one',
      next: undefined,
      finish: true
    }
  ])
})

test('Wizard will show current step, when there is a match', () => {
  const props = createProps()
  const currentStepConfiguration = {
    name: 'step-two',
    previous: 'step-one',
    next: 'step-three',
    finish: false
  }
  const component = mount(
    <Wizard currentStepConfiguration={currentStepConfiguration} {...props}>
      <Step name='step-one' component={StepOne} next='step-two' />
      <Step name='step-two' component={StepTwo} next='step-three' />
      <Step name='step-three' component={StepThree} />
    </Wizard>
  )

  expect(component.find(StepTwo).length)
    .toBe(1)

  // And pass handlePrevious and handleNext into previous and next.
  const wizardInstance: Wizard = component.instance()
  expect(component.find(StepTwo).prop('previous'))
    .toBe(wizardInstance.handlePrevious)
  expect(component.find(StepTwo).prop('next'))
    .toBe(wizardInstance.handleNext)
})

test('Wizard will not send in handlePrevious or handelProceed if a step is missing both previous and next', () => {
  const props = createProps()
  const currentStepConfiguration = {
    name: 'step-one',
    previous: null,
    next: null,
    finish: true
  }
  const component = mount(
    <Wizard currentStepConfiguration={currentStepConfiguration} {...props}>
      <Step name='step-one' component={StepOne} />
    </Wizard>
  )

  expect(component.find(StepOne).length)
    .toBe(1)

  // And pass neither handlePrevious or handleNext into previous and next.
  expect(component.find(StepOne).prop('previous'))
    .toBe(null)
  expect(component.find(StepOne).prop('next'))
    .toBe(null)
})

test('Wizard will show nothing, when there is no match', () => {
  const props = createProps()
  const component = mount(
    <Wizard currentStep='this-will-not-match' {...props}>
      <Step name='step-one' component={StepOne} next='step-two' />
      <Step name='step-two' component={StepTwo} next='step-three' />
      <Step name='step-three' component={StepThree} />
    </Wizard>
  )

  expect(component.children().length)
    .toBe(0)
})

test('Wizard will destroy its state, when it is unmounted', () => {
  const props = createProps()
  const component = mount(
    <Wizard {...props}>
      <Step name='step-one' component={StepOne} next='step-two' />
      <Step name='step-two' component={StepTwo} next='step-three' />
      <Step name='step-three' component={StepThree} />
    </Wizard>
  )

  component.unmount()

  const destroyWizardCall = props.destroy.mock.calls[0]
  expect(destroyWizardCall).toEqual([ 'some-wizard' ])
})

test('Wizard will call previous, when handlePrevious is called', () => {
  const props = createProps()
  const component = mount(
    <Wizard {...props}>
      <Step name='step-one' component={StepOne} next='step-two' />
      <Step name='step-two' component={StepTwo} next='step-three' />
      <Step name='step-three' component={StepThree} />
    </Wizard>
  )

  const wizardInstance: Wizard = component.instance()
  wizardInstance.handlePrevious()

  const previousStepCall = props.previous.mock.calls[0]
  expect(previousStepCall).toEqual([ 'some-wizard' ])
})

test('Wizard will call next, when handleNext is called', () => {
  const props = createProps()
  const component = mount(
    <Wizard {...props}>
      <Step name='step-one' component={StepOne} next='step-two' />
      <Step name='step-two' component={StepTwo} next='step-three' />
      <Step name='step-three' component={StepThree} />
    </Wizard>
  )

  const wizardInstance: Wizard = component.instance()
  wizardInstance.handleNext()

  const nextStepCall = props.next.mock.calls[0]
  expect(nextStepCall).toEqual([ 'some-wizard', {} ])
})
