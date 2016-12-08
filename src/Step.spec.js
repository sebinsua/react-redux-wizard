/* @flow */
import React, { Element } from 'react'
import { shallow } from 'enzyme'

import { Step } from './Step'

function StepOne (): Element<*> {
  return <span>Step 1</span>
}

test('Step can be rendered', () => {
  const identity = v => v
  const component = shallow(
    <Step component={StepOne} handlePrevious={identity} handleNext={identity} />
  )

  expect(component.type())
    .toBe(StepOne)
  expect(component.prop('previous'))
    .toBeDefined()
  expect(component.prop('next'))
    .toBeDefined()
})
