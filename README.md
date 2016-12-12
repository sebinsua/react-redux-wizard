# `react-redux-wizard` [![Build Status](https://travis-ci.org/sebinsua/react-redux-wizard.png)](https://travis-ci.org/sebinsua/react-redux-wizard) [![npm version](https://badge.fury.io/js/react-redux-wizard.svg)](https://npmjs.org/package/react-redux-wizard)
> A simple wizard for React.

This component allows you to represent the flow of a wizard with JSX.

NOTE: I have not worked on an integration with a React router, so if you require deep-linking I would not recommend using it yet. It is however completely functional for wizards within modals, and for small sign-up wizards, etc.

## Example

```js
import React from 'react'
import { Wizard, Step, match } from 'react-redux-wizard'

const StepOne = ({ name, previous, next }) =>
  <div onClick={next}>{name}</div>
const StepTwo = ({ name, previous, next }) =>
  <div onClick={next.bind(null, { formValue: Math.random() > 0.5 ? 'extra-flow' : null })}>{name}</div>
const StepThree = ({ name, previous, next }) =>
  <div onClick={previous}>{name}</div>

function SomeFormWizard () {
  return (
    <Wizard name="SomeFormWizard">
      <Step name="step-1" component={StepOne} next="step-2" />
      <Step
        name="step-2"
        component={StepTwo}
        next={match('/formValue', {
          'step-2.5': 'extra-flow', /* stepName <- value*/
          'step-3': null /* stepName <- value*/
        })}
      />
      <Step name="step-2.5" component={StepTwo} next="step-3" />
      <Step name="step-3" component={StepThree} />
    </Wizard>
  )
}

export default SomeFormWizard
```

## Install

```sh
yarn add react-redux-wizard
```

## API

### Reducer

Your root reducer should use the `reducer` exported by this module against its `wizards` key.

### Component

#### `<Wizard name={string}>{...steps}</Wizard>`

#### `<Step name={string} component={YourReactComponent} previous={string} next={string|StepPredicate|StepFn} />`

`StepPredicate` is an `Array<{ predicate: JsonPredicate, to: string }>` where `JsonPredicate` [follows the JSON Predicate spec](https://github.com/MalcolmDwyer/json-predicate). `match(string, StepNameToValues)` is just sugar for generating these predicates when given some `Step` names and the associated `values` to check for at a `pathName`.

We can pass a functions in but we really shouldn't as doing so means that the store can no longer be fully serialized. However, it is possible:

> `StepFn` has the form `(values: KeyValueObject, wizardState: KeyValueObject) => ?string`
and can be used to pick the next step depending on either the values emitted from a component,
or some of the wizard's internal state.

#### `<YourReactComponent previous={() => void} next={(values: KeyValueObject) => void} />`

`<YourReactComponent>` should receive two functions `previous` and `next`.

`previous` will take zero arguments and go to the previous step,
while `next` expects a `values` key-value object.

These are different functions from the ones you passed into `<Step>`.
