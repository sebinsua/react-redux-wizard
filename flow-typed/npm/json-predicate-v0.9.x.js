declare module 'json-predicate' {

    declare type KeyValueObject = { [key: string]: any };

    // JSON Predicate
    declare type FirstOrderOp = 'contains'
                              | 'defined'
                              | 'ends'
                              | 'in'
                              | 'less'
                              | 'matches'
                              | 'more'
                              | 'starts'
                              | 'test'
                              | 'type'
                              | 'undefined'
                              | 'contained'
                              | 'intersect';
    declare type SecondOrderOp = 'and' | 'not' | 'or';

    declare type FirstOrderJsonPredicate = {
      op: FirstOrderOp,
      path: string,
      value?: string | number | boolean | KeyValueObject | Array<any> | void,
      ignore_case?: boolean
    };
    declare type SecondOrderJsonPredicate = {
      op: SecondOrderOp,
      path?: string,
      apply: Array<FirstOrderJsonPredicate | SecondOrderJsonPredicate>
    };

    declare type JsonPredicate = FirstOrderJsonPredicate | SecondOrderJsonPredicate;

    declare function test(values: KeyValueObject, predicate: JsonPredicate): boolean;
};
