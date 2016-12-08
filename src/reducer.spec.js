/* @flow */
import { INITIALIZE, REGISTER_STEP, PREVIOUS_STEP, NEXT_STEP, DESTROY } from './actionTypes'
import reducer, { initialState } from './reducer'

import type {
  InitializeWizardAction,
  RegisterStepAction,
  PreviousStepAction,
  NextStepAction,
  DestroyWizardAction
} from './types'

test('reducer sets up initialState', () => {
  expect(reducer(undefined))
    .toEqual(initialState)
})

test('reducer handles INITIALIZE', () => {
  const initializeWizardAction: InitializeWizardAction = { type: INITIALIZE, payload: { name: 'some-wizard', firstStep: 'first-step' } }
  expect(reducer({ }, initializeWizardAction))
    .toEqual({ 'some-wizard': { currentStep: 'first-step', steps: {}, stack: [ 'first-step' ] } })
})

test('reducer handles REGISTER_STEP', () => {
  const registerStepAction: RegisterStepAction = {
    type: REGISTER_STEP,
    payload: {
      name: 'some-wizard',
      step: {
        name: 'register-this-step',
        previous: 'untouched-step',
        next: 'next-step',
        finish: false
      }
    }
  }
  expect(reducer({
    'some-wizard': {
      currentStep: 'first-step',
      steps: {
        'untouched-step': {
          name: 'untouched-step',
          previous: null,
          next: 'register-this-step',
          finish: false
        }
      },
      stack: []
    }
  }, registerStepAction))
    .toEqual({
      'some-wizard': {
        currentStep: 'first-step',
        steps: {
          'untouched-step': {
            name: 'untouched-step',
            previous: null,
            next: 'register-this-step',
            finish: false
          },
          'register-this-step': {
            name: 'register-this-step',
            previous: 'untouched-step',
            next: 'next-step',
            finish: false
          }
        },
        stack: []
      }
    })
})

test('reducer handles PREVIOUS_STEP', () => {
  const steps = {
    'previous-step': {
      name: 'previous-step',
      previous: null,
      next: 'current-step',
      finish: false
    },
    'current-step': {
      name: 'current-step',
      previous: 'previous-step',
      next: null,
      finish: true
    }
  }

  const previousStepAction: PreviousStepAction = { type: PREVIOUS_STEP, payload: { name: 'some-wizard', step: 'previous-step' } }
  expect(
    reducer({
      'some-wizard': {
        currentStep: 'current-step',
        steps: steps,
        stack: [ 'previous-step', 'current-step' ]
      }
    }, previousStepAction)
  ).toEqual({ 'some-wizard': { currentStep: 'previous-step', steps: steps, stack: [ 'previous-step' ] } })
})

test('reducer handles NEXT_STEP', () => {
  const steps = {
    'current-step': {
      name: 'current-step',
      previous: null,
      next: 'next-step',
      finish: false
    },
    'next-step': {
      name: 'next-step',
      previous: 'current-step',
      next: null,
      finish: true
    }
  }

  const nextStepAction: NextStepAction = { type: NEXT_STEP, payload: { name: 'some-wizard', values: { someProperty: 'some-property' } } }
  expect(
    reducer({
      'some-wizard': {
        currentStep: 'current-step',
        steps: steps,
        stack: [ 'current-step' ]
      }
    }, nextStepAction)
  ).toEqual({ 'some-wizard': { currentStep: 'next-step', steps: steps, stack: [ 'current-step', 'next-step' ] } })
})

test('reducer handles DESTROY', () => {
  const destroyWizardAction: DestroyWizardAction = { type: DESTROY, payload: { name: 'some-wizard' } }
  expect(reducer({ 'some-wizard': { currentStep: 'next-step', steps: {}, stack: [] } }, destroyWizardAction))
    .toEqual({ })
})
