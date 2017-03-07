import stripDiacritics from './stripDiacritics';

const filterOptions = (options, filterValue, excludeOptions, props) => {
  let newFilterValue = filterValue;
  let newExcludeOptions = excludeOptions;

  if (props.ignoreAccents) {
    newFilterValue = stripDiacritics(newFilterValue);
  }

  if (props.ignoreCase) {
    newFilterValue = newFilterValue.toLowerCase();
  }

  if (newExcludeOptions) newExcludeOptions = newExcludeOptions.map(i => i[props.valueKey]);

  return options.filter(option => {
    if (newExcludeOptions && newExcludeOptions.indexOf(option[props.valueKey]) > -1) return false;
    if (props.filterOption) return props.filterOption.call(this, option, newFilterValue);
    if (!newFilterValue) return true;
    const valueTest = String(option[props.valueKey]);
    const labelTest = String(option[props.labelKey]);
    if (props.ignoreAccents) {
      if (props.matchProp !== 'label') valueTest = stripDiacritics(valueTest);
      if (props.matchProp !== 'value') labelTest = stripDiacritics(labelTest);
    }
    if (props.ignoreCase) {
      if (props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
      if (props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
    }
    return props.matchPos === 'start'
      ? props.matchProp !== 'label'
        && valueTest.substr(0, newFilterValue.length) === newFilterValue
        || props.matchProp !== 'value'
        && labelTest.substr(0, newFilterValue.length) === newFilterValue
      : props.matchProp !== 'label' && valueTest.indexOf(newFilterValue) >= 0
        || props.matchProp !== 'value' && labelTest.indexOf(newFilterValue) >= 0;
  });
};

export default filterOptions;
