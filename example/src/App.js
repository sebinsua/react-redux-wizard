import React, { Component } from 'react'
import { Wizard, Step } from 'react-redux-wizard'

import './App.css'

function StepActions ({ previous, next }) {
  return (
    <div className='actions'>
      {previous ? <button onClick={previous}>Previous</button> : null}
      {next ? <button onClick={next}>Next</button> : 'Finished!'}
    </div>
  )
}

function StepOne ({ previous, next }) {
  return (
    <div className='step step-one'>
      Step One
      <StepActions previous={previous} next={next} />
    </div>
  )
}

function StepTwo ({ previous, next }) {
  return (
    <div className='step step-two'>
      Step Two
      <StepActions previous={previous} next={next} />
    </div>
  )
}

function StepThree ({ previous, next }) {
  return (
    <div className='step step-three'>
      Step Three
      <StepActions previous={previous} next={next.bind(null, { choice: Math.random() > 0.5 ? 'a' : 'b' })} />
    </div>
  )
}

function Finish ({ name, previous, next }) {
  return (
    <div className='step step-finish'>
      {name}
      <StepActions previous={previous} next={next} />
    </div>
  )
}

class App extends Component {

  render () {
    return (
      <div className='App'>
        <Wizard name='SomeFormWizard'>
          <Step name='step-one' component={StepOne} next='step-two' />
          <Step name='step-two' component={StepTwo} next='step-three' />
          <Step name='step-three' component={StepThree} next={values => values.choice ? `finish-${values.choice}` : null} />
          <Step name='finish-a' component={Finish} previous='step-two' />
          <Step name='finish-b' component={Finish} previous='step-three' />
        </Wizard>
      </div>
    )
  }

}

export default App
