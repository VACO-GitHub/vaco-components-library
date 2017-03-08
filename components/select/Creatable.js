import React, { Component, PropTypes } from 'react';
import Select from './Select';
import defaultFilterOptions from '../utils/defaultFilterOptions';
import defaultMenuRenderer from '../utils/defaultMenuRenderer';

const defaultChildren = (props) => <Select {...props} />;

const isOptionUnique = ({ option, options, labelKey, valueKey }) => {
  return options.filter(
    existingOption =>
      existingOption[labelKey] === option[labelKey]
      || existingOption[valueKey] === option[valueKey]
  ).length === 0;
};

const isValidNewOption = ({ label }) => !!label;

const newOptionCreator = ({ label, labelKey, valueKey }) => {
  const option = {};
  option[valueKey] = label;
  option[labelKey] = label;
  option.className = 'Select-create-option-placeholder';
  return option;
};

const promptTextCreator = (label) => `Create option "${label}"`;

function shouldKeyDownEventCreateNewOption ({ keyCode }) {
  switch (keyCode) {
    case 9: // TAB
    case 13: // ENTER
    case 188: // COMMA
      return true;
    default:
      break;
  }

  return false;
}


export default class Creatable extends Component {
  static displayName = 'CreatableSelect';
  static propTypes = {
    // Child function responsible for creating the inner Select component
    // This component can be used to compose HOCs (eg Creatable and Async)
    // (props: Object): PropTypes.element
    children: PropTypes.func,
    // See Select.propTypes.filterOptions
    filterOptions: PropTypes.any,
    // Searches for any matching option within the set of options.
    // This function prevents duplicate options from being created.
    // ({ option: Object, options: Array, labelKey: string, valueKey: string }): boolean
    isOptionUnique: PropTypes.func,
    // Determines if the current input text represents a valid option.
    // ({ label: string }): boolean
    isValidNewOption: PropTypes.func,
    // See Select.propTypes.menuRenderer
    menuRenderer: PropTypes.any,
    // Factory to create new option.
    // ({ label: string, labelKey: string, valueKey: string }): Object
    newOptionCreator: PropTypes.func,
    // input change handler: function (inputValue) {}
    onInputChange: PropTypes.func,
    // input keyDown handler: function (event) {}
    onInputKeyDown: PropTypes.func,
    // new option click handler: function (option) {}
    onNewOptionClick: PropTypes.func,
    // See Select.propTypes.options
    options: PropTypes.array,
    // Creates prompt/placeholder option text.
    // (filterText: string): string
    promptTextCreator: PropTypes.func,
    // Decides if a keyDown event (eg its `keyCode`) should result in the creation of a new option.
    shouldKeyDownEventCreateNewOption: PropTypes.func
  };
  static statics = {
    isOptionUnique,
    isValidNewOption,
    newOptionCreator,
    promptTextCreator,
    shouldKeyDownEventCreateNewOption
  };
  static defaultProps = {
    filterOptions: defaultFilterOptions,
    isOptionUnique,
    isValidNewOption,
    menuRenderer: defaultMenuRenderer,
    newOptionCreator,
    promptTextCreator,
    shouldKeyDownEventCreateNewOption
  };

  createNewOption () {
    const {
      onNewOptionClick,
      options = [],
      // eslint-disable-next-line no-shadow, no-unused-vars
      shouldKeyDownEventCreateNewOption
    } = this.props;

    if (this.props.isValidNewOption({ label: this.inputValue })) {
      const option = this.props.newOptionCreator({
        label: this.inputValue,
        labelKey: this.labelKey,
        valueKey: this.valueKey
      });
      const isCreateNewOptionUnique = this.isOptionUnique({ option });

      // Don't add the same option twice.
      if (isCreateNewOptionUnique) {
        if (onNewOptionClick) {
          onNewOptionClick(option);
        } else {
          options.unshift(option);

          this.select.selectValue(option);
        }
      }
    }
  }

  filterOptions (...params) {
    // eslint-disable-next-line no-unused-vars
    const { filterOptions, options } = this.props;

    // TRICKY Check currently selected options as well.
    // Don't display a create-prompt for a value that's selected.
    // This covers async edge-cases where a newly-created Option isn't yet in the async-loaded array.
    const excludeOptions = params[2] || [];

    const filteredOptions = filterOptions(...params) || [];

    if (this.props.isValidNewOption({ label: this.inputValue })) {
      const option = this.props.newOptionCreator({
        label: this.inputValue,
        labelKey: this.labelKey,
        valueKey: this.valueKey
      });

      // TRICKY Compare to all options (not just filtered options) in case option has already been selected).
      // For multi-selects, this would remove it from the filtered list.
      const isValidNewOptionUnique = this.isOptionUnique({
        option,
        options: excludeOptions.concat(filteredOptions)
      });

      if (isValidNewOptionUnique) {
        const prompt = this.props.promptTextCreator(this.inputValue);

        this._createPlaceholderOption = this.props.newOptionCreator({
          label: prompt,
          labelKey: this.labelKey,
          valueKey: this.valueKey
        });

        filteredOptions.unshift(this._createPlaceholderOption);
      }
    }

    return filteredOptions;
  }

  isOptionUnique ({ option, options }) {
    let newOptions = options;

    newOptions = newOptions || this.select.filterOptions();

    return this.props.isOptionUnique({
      labelKey: this.labelKey,
      option,
      newOptions,
      valueKey: this.valueKey
    });
  }

  menuRenderer (params) {
    const { menuRenderer } = this.props;

    return menuRenderer({
      ...params,
      onSelect: this.onOptionSelect,
      selectValue: this.onOptionSelect
    });
  }

  onInputChange (input) {
    const { onInputChange } = this.props;

    if (onInputChange) {
      onInputChange(input);
    }

    // This value may be needed in between Select mounts (when this.select is null)
    this.inputValue = input;
  }

  onInputKeyDown (event) {
    const { onInputKeyDown } = this.props;
    const focusedOption = this.select.getFocusedOption();

    if (
      focusedOption
      && focusedOption === this._createPlaceholderOption
      && this.props.shouldKeyDownEventCreateNewOption({ keyCode: event.keyCode })
    ) {
      this.createNewOption();

      // Prevent decorated Select from doing anything additional with this keyDown event
      event.preventDefault();
    } else if (onInputKeyDown) {
      onInputKeyDown(event);
    }
  }

  // eslint-disable-next-line no-unused-vars
  onOptionSelect (option, event) {
    if (option === this._createPlaceholderOption) {
      this.createNewOption();
    } else {
      this.select.selectValue(option);
    }
  }

  render () {
    const {
      /* eslint-disable no-shadow, no-unused-vars */
      newOptionCreator,
      shouldKeyDownEventCreateNewOption,
      /* eslint-enable no-shadow, no-unused-vars */
      ...restProps
    } = this.props;

    let { children } = this.props;

    // We can't use destructuring default values to set the children,
    // because it won't apply work if `children` is null. A falsy check is
    // more reliable in real world use-cases.
    if (!children) {
      children = defaultChildren;
    }

    const props = {
      ...restProps,
      allowCreate: true,
      filterOptions: this.filterOptions,
      menuRenderer: this.menuRenderer,
      onInputChange: this.onInputChange,
      onInputKeyDown: this.onInputKeyDown,
      ref: ref => {
        this.select = ref;

        // These values may be needed in between Select mounts (when this.select is null)
        if (ref) {
          this.labelKey = ref.props.labelKey;
          this.valueKey = ref.props.valueKey;
        }
      }
    };

    return children(props);
  }
}
