/* eslint-disable */
/* @flow */
import type { Component, Element as ReactElement } from 'react'
import type { Dispatch as ReduxDispatch, ActionCreator as ReduxActionCreator } from 'redux'
import type { Connector as ReactReduxConnector } from 'react-redux'

// React
type FunctionComponent<P> = (props: P) => ?ReactElement<any>
type ClassComponent<D, P, S> = Class<Component<D, P, S>>
type ReactComponent<D, P, S> = FunctionComponent<P> | ClassComponent<D, P, S>
type ReactChildren = ReactElement<*> | Array<ReactElement<*>>

// Misc
type KeyValueObject = { [key: string]: any }

// Reducer
type StepFn = (values: KeyValueObject, wizardState: KeyValueObject) => ?string
type StepConfiguration = {
  name: string,
  previous: ?string,
  next: ?string | ?StepFn,
  finish: boolean,
}
type WizardsReducerState = {
  [key: string]: {
    currentStep: string,
    stack: Array<string>,
    steps: {
      [key: string]: StepConfiguration
    },
  }
}

// Actions
type FluxStandardAction<T, P> = {
  type: T,
  error?: boolean,
  payload?: P
}
type InitializeWizardAction = FluxStandardAction<'@react-redux-wizard/INITIALIZE', { name: string, firstStep: string }>
type RegisterStepAction = FluxStandardAction<'@react-redux-wizard/REGISTER_STEP', { name: string, step: { name: string } }>
type PreviousStepAction = FluxStandardAction<'@react-redux-wizard/PREVIOUS_STEP', { name: string }>
type NextStepAction = FluxStandardAction<'@react-redux-wizard/NEXT_STEP', { name: string, values: KeyValueObject }>
type DestroyWizardAction = FluxStandardAction<'@react-redux-wizard/DESTROY', { name: string }>
type WizardActions = InitializeWizardAction
                   | RegisterStepAction
                   | PreviousStepAction
                   | NextStepAction
                   | DestroyWizardAction

export type {
  ReactComponent,
  ReactElement,
  ReactChildren,
  ReduxDispatch,
  ReduxActionCreator,
  ReactReduxConnector,
  KeyValueObject,
  StepConfiguration,
  WizardsReducerState,
  InitializeWizardAction,
  RegisterStepAction,
  PreviousStepAction,
  NextStepAction,
  DestroyWizardAction,
  WizardActions
}
