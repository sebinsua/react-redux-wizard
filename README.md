# `react-redux-wizard` [![Build Status](https://travis-ci.org/sebinsua/react-redux-wizard.png)](https://travis-ci.org/sebinsua/react-redux-wizard) [![npm version](https://badge.fury.io/js/react-redux-wizard.svg)](https://npmjs.org/package/react-redux-wizard)
> A simple wizard for React.

## Example

```js
import React from 'react'
import { Wizard, Step } from 'react-redux-wizard'

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
      <Step name="step-2" component={StepTwo} next={values => values.formValue === 'extra-flow' ? 'step-2.5' : 'step-3'} />
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

#### `<Step name={string} component={YourReactComponent} previous={string} next={string|StepFn} />`

`StepFn` has the form `(values: KeyValueObject, wizardState: KeyValueObject) => ?string`
and can be used to pick the next step depending on either the values emitted from a component,
or some of the wizard's internal state.

#### `<YourReactComponent previous={() => void} next={(values: KeyValueObject) => void} />`

`<YourReactComponent>` should receive two functions `previous` and `next`.

`previous` will take zero arguments and go to the previous step,
while `next` expects a `values` key-value object.

These are different functions from the ones you passed into `<Step>`.
