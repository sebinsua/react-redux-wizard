/* @flow */
import {
  INITIALIZE,
  REGISTER_STEP,
  PREVIOUS_STEP,
  NEXT_STEP,
  DESTROY
} from './actionTypes'

import type {
  KeyValueObject,
  StepConfiguration,
  InitializeWizardAction,
  RegisterStepAction,
  PreviousStepAction,
  NextStepAction,
  DestroyWizardAction
} from './types'

const initializeWizard = (name: string, firstStep: string): InitializeWizardAction =>
  ({ type: INITIALIZE, payload: { name, firstStep } })

const registerStep = (name: string, step: StepConfiguration): RegisterStepAction =>
  ({ type: REGISTER_STEP, payload: { name, step } })

const previousStep = (name: string): PreviousStepAction =>
  ({ type: PREVIOUS_STEP, payload: { name } })

const nextStep = (name: string, values: KeyValueObject): NextStepAction =>
  ({ type: NEXT_STEP, payload: { name, values } })

const destroyWizard = (name: string): DestroyWizardAction =>
  ({ type: DESTROY, payload: { name } })

export { initializeWizard, registerStep, previousStep, nextStep, destroyWizard }
