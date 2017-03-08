import React, { Component } from 'react';
import Select from './Select';

const reduce = (obj, props = {}) => {
  return Object.keys(obj).reduce(
    (objProps, key) => {
      const value = obj[key];
      if (value !== undefined) objProps[key] = value;
      return objProps;
    },
    props
  );
};

export default class AsyncCreatable extends Component {
  static displayName = 'AsyncCreatableSelect';
  render () {
    return (
      <Select.Async {...this.props}>
        {asyncProps => (
          <Select.Creatable {...this.props}>
            {creatableProps => (
              <Select
                {...reduce(asyncProps, reduce(creatableProps, {}))}
                onInputChange={input => {
                  creatableProps.onInputChange(input);
                  return asyncProps.onInputChange(input);
                }}
                ref={ref => {
                  creatableProps.ref(ref);
                  asyncProps.ref(ref);
                }}
              />
            )}
          </Select.Creatable>
        )}
      </Select.Async>
    );
  }
}
