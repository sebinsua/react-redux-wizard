/* @flow */
import type { StepPredicate } from './types'

type StepToValues = { [key: string]: any | Array<any> }

function match (path: string, stepToValues: StepToValues = {}): Array<StepPredicate> {
  const stepNames = Object.keys(stepToValues)
  return stepNames.reduce((stepPredicates, stepName) => {
    const value = stepToValues[stepName]
    const op = Array.isArray(value) ? 'in' : 'test'
    stepPredicates.push({ predicate: { op, path, value }, to: stepName })
    return stepPredicates
  }, [])
}

export default match
