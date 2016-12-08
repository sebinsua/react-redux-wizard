/* @flow */
import { INITIALIZE, REGISTER_STEP, PREVIOUS_STEP, NEXT_STEP, DESTROY } from './actionTypes'
import { initializeWizard, registerStep, previousStep, nextStep, destroyWizard } from './actions'

test('initializeWizard should create INITIALIZE action', () => {
  const expectedAction = { type: INITIALIZE, payload: { name: 'some-wizard', firstStep: 'first-step' } }
  expect(initializeWizard('some-wizard', 'first-step'))
    .toEqual(expectedAction)
})

test('registerStep should create REGISTER_STEP action', () => {
  const StepConfiguration = { name: 'step-to-be-registered', previous: null, next: null, finish: true }
  const expectedAction = { type: REGISTER_STEP, payload: { name: 'some-wizard', step: StepConfiguration } }
  expect(registerStep('some-wizard', StepConfiguration))
    .toEqual(expectedAction)
})

test('previousStep should create PREVIOUS_STEP action', () => {
  const expectedAction = { type: PREVIOUS_STEP, payload: { name: 'some-wizard' } }
  expect(previousStep('some-wizard', 'previous-step'))
    .toEqual(expectedAction)
})

test('nextStep should create NEXT_STEP action', () => {
  const expectedAction = { type: NEXT_STEP, payload: { name: 'some-wizard', values: { someProperty: 'some-property' } } }
  expect(nextStep('some-wizard', { someProperty: 'some-property' }))
    .toEqual(expectedAction)
})

test('destroyWizard should create DESTROY action', () => {
  const expectedAction = { type: DESTROY, payload: { name: 'some-wizard' } }
  expect(destroyWizard('some-wizard'))
    .toEqual(expectedAction)
})
