import React from 'react'

import type {
  ReactComponent,
  KeyValueObject
} from './types'

type StepProps = {
  name: string,
  handlePrevious: () => void,
  handleNext: (values: KeyValueObject) => void,
  finish: boolean,
  component?: ReactComponent,
}

export const Step = ({
  name,
  handlePrevious,
  handleNext,
  finish,
  component: StepComponent
}: StepProps) => (
  <StepComponent
    name={name}
    previous={handlePrevious}
    next={handleNext}
    finish={finish}
  />
)

export default Step
