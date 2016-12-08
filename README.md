# `react-redux-wizard` [![Build Status](https://travis-ci.org/sebinsua/react-redux-wizard.png)](https://travis-ci.org/sebinsua/react-redux-wizard) [![npm version](https://badge.fury.io/js/react-redux-wizard.svg)](https://npmjs.org/package/react-redux-wizard)
> A simple wizard for React.

**This is a work-in-progress.**

### Thoughts

```js
function SomeFormWizard () {
  return (
    <Wizard name="SomeFormWizard" done={...}>
      <Step name="step-one" component={StepOne} next={() => 'step-two'} />
      <Step name="step-two" component={StepTwo} next={() => 'step-there'} />
      <Step name="step-three" component={StepThree} finish />
    </Wizard>
  )
}

export default SomeFormWizard
```
- vs. -
```js
function SomeFormWizard () {
  return (
    <div className="some-form-wizard">
      <Step name="step-one" component={StepOne} next={() => 'step-two'} />
      <Step name="step-two" component={StepTwo} next={() => 'step-there'} />
      <Step name="step-three" component={StepThree} finish />
    </div>
  )
}

export default reduxFormWizard({
  name: 'SomeFormWizard'
})(SomeFormWizard)
```
- vs. -
```js
const SomeWizard = (props) =>
   <Wizard name="SomeFormWizard" done={...}>
      <Step name="step-one" next={() => 'step-two'}>
        <input name="blah" />
      </Step>
      <Step name="step-two" next={() => 'step-three'}>
        <input name="blah2" />
      </Step>
      <Step name="step-three" component={LastStep} finish />
    </Wizard>
```

## Install

```sh
npm install --save react-redux-wizard
```

## Example

```js
// TODO: Show example.
```

## API

### Reducer

Your root reducer should use the `reducer` exported by this module against its `wizards` key.

### Actions

#### `TODO: Create actions.`

### Component

#### `TODO: Create components.`
