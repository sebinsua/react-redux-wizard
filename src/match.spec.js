/* @flow */
import match from './match'

test('match should generate predicates from some stepName to values object', () => {
  expect(match('/some/path', {
    forkStep1: 100,
    forkStep2: 'hello-there',
    forkStep3: [ 'other-key', 'some-other-key', 'extra-strange-key' ]
  })).toEqual([
    { predicate: { op: 'test', path: '/some/path', value: 100 }, to: 'forkStep1' },
    { predicate: { op: 'test', path: '/some/path', value: 'hello-there' }, to: 'forkStep2' },
    { predicate: { op: 'in', path: '/some/path', value: [ 'other-key', 'some-other-key', 'extra-strange-key' ] }, to: 'forkStep3' }
  ])
})
