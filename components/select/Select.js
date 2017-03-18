import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import AutosizeInput from 'react-input-autosize';
import classNames from 'classnames';

// import InjectInput from '../input/Input.js';
import Option from '../option';
import Value from '../value';

import defaultArrowRenderer from '../utils/defaultArrowRenderer';
import defaultFilterOptions from '../utils/defaultFilterOptions';
import defaultMenuRenderer from '../utils/defaultMenuRenderer';
import defaultClearRenderer from '../utils/defaultClearRenderer';

const stringifyValue = value => {
  const valueType = typeof value;
  if (valueType === 'string') {
    return value;
  } else if (valueType === 'object') {
    return JSON.stringify(value);
  } else if (valueType === 'number' || valueType === 'boolean') {
    return String(value);
  } else {
    return '';
  }
};

let instanceId = 1;

class Select extends Component {
  static displayName = 'Select';
  static propTypes = {
    'aria-label': PropTypes.string,
    // Aria label (for assistive tech)
    'aria-labelledby': PropTypes.string,
    // HTML ID of an element that should be used as the label (for assistive tech)
    addLabelText: PropTypes.string,
    // placeholder displayed when you want to add a label on a multi-value input
    arrowRenderer: PropTypes.func,
    // Create drop-down caret element
    autoBlur: PropTypes.bool,
    // automatically blur the component when an option is selected
    autofocus: PropTypes.bool,
    // autofocus the component on mount
    autosize: PropTypes.bool,
    // whether to enable autosizing or not
    backspaceRemoves: PropTypes.bool,
    // whether backspace removes an item if there is no text input
    backspaceToRemoveMessage: PropTypes.string,
    // Message to use for screenreaders to press backspace to remove the current item - {label} is replaced with the item label
    className: PropTypes.string,
    // className for the outer element
    clearAllText: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),
    // title for the "clear" control when multi: true
    clearRenderer: PropTypes.func,
    // render the clear component via props for more control
    clearRendererFull: PropTypes.func,
    // create clearable x element
    clearValueText: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),
    // title for the "clear" control
    clearable: PropTypes.bool,
    // should it be possible to reset value
    deleteRemoves: PropTypes.bool,
    // whether backspace removes an item if there is no text input
    delimiter: PropTypes.string,
    // delimiter to use to join multiple values for the hidden field value
    disabled: PropTypes.bool,
    // whether the Select is disabled or not
    escapeClearsValue: PropTypes.bool,
    // whether escape clears the value when the menu is closed
    filterOption: PropTypes.func,
    // method to filter a single option (option, filterString)
    filterOptions: PropTypes.any,
    // boolean to force clear the select's value
    forceClearValue: PropTypes.bool,
    // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
    ignoreAccents: PropTypes.bool,
    // whether to strip diacritics when filtering
    ignoreCase: PropTypes.bool,
    // whether to perform case-insensitive filtering
    inputProps: PropTypes.object,
    // custom attributes for the Input
    inputRenderer: PropTypes.func,
    // returns a custom input component
    instanceId: PropTypes.string,
    // set the components instanceId
    isLoading: PropTypes.bool,
    // whether the Select is loading externally or not (such as options being loaded)
    joinValues: PropTypes.bool,
    // joins multiple values into a single form field with the delimiter (legacy mode)
    labelKey: PropTypes.string,
    // path of the label value in option objects
    matchPos: PropTypes.string,
    // (any|start) match the start or entire string when filtering
    matchProp: PropTypes.string,
    // (any|label|value) which option property to filter on
    menuBuffer: PropTypes.number,
    // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
    menuContainerStyle: PropTypes.object,
    // optional style to apply to the menu container
    menuRenderer: PropTypes.func,
    // renders a custom menu with options
    menuStyle: PropTypes.object,
    // optional style to apply to the menu
    meta: PropTypes.shape({
      //from redux-form library
      active: PropTypes.bool,
      asyncValidating: PropTypes.bool,
      autofilled: PropTypes.bool,
      dirty: PropTypes.bool,
      dispatch: PropTypes.func,
      error: PropTypes.string,
      invalid: PropTypes.bool,
      pristine: PropTypes.bool,
      submitFailed: PropTypes.bool,
      submitting: PropTypes.bool,
      touched: PropTypes.bool,
      valid: PropTypes.bool,
      visited: PropTypes.bool
    }),
    multi: PropTypes.bool,
    // multi-value input
    name: PropTypes.string,
    // generates a hidden <input /> tag with this field name for html forms
    noResultsText: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),
    // placeholder displayed when there are no matching search results
    onBlur: PropTypes.func,
    // onBlur handler: function (event) {}
    onBlurResetsInput: PropTypes.bool,
    // whether input is cleared on blur
    onChange: PropTypes.func,
    // onChange handler: function (newValue) {}
    onClose: PropTypes.func,
    // fires when the menu is closed
    onCloseResetsInput: PropTypes.bool,
    // whether input is cleared when menu is closed through the arrow
    onFocus: PropTypes.func,
    // onFocus handler: function (event) {}
    onInputChange: PropTypes.func,
    // onInputChange handler: function (inputValue) {}
    onInputKeyDown: PropTypes.func,
    // input keyDown handler: function (event) {}
    onMenuScrollToBottom: PropTypes.func,
    // fires when the menu is scrolled to the bottom; can be used to paginate options
    onOpen: PropTypes.func,
    // fires when the menu is opened
    onValueClick: PropTypes.func,
    // onClick handler for value labels: function (value, event) {}
    openAfterFocus: PropTypes.bool,
    // boolean to enable opening dropdown when focused
    openOnFocus: PropTypes.bool,
    // always open options menu on focus
    optionClassName: PropTypes.string,
    // additional class(es) to apply to the <Option /> elements
    optionComponent: PropTypes.func,
    // option component to render in dropdown
    optionRenderer: PropTypes.func,
    // optionRenderer: function (option) {}
    options: PropTypes.array,
    // array of options
    pageSize: PropTypes.number,
    // number of entries to page when using page up/down keys
    placeholder: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),
    // field placeholder, displayed when there's no value
    required: PropTypes.bool,
    // applies HTML5 required attribute when needed
    resetValue: PropTypes.any,
    // value to use when you clear the control
    scrollMenuIntoView: PropTypes.bool,
    // boolean to enable the viewport to shift so that the full menu fully visible when engaged
    searchable: PropTypes.bool,
    // whether to enable searching feature or not
    simpleValue: PropTypes.bool,
    // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
    style: PropTypes.object,
    // optional style to apply to the control
    tabIndex: PropTypes.string,
    // optional tab index of the control
    tabSelectsValue: PropTypes.bool,
    // whether to treat tabbing out while focused to be value selection
    theme: PropTypes.shape({
      counter: PropTypes.string,
      disabled: PropTypes.string,
      error: PropTypes.string,
      errored: PropTypes.string,
      hidden: PropTypes.string,
      hint: PropTypes.string,
      icon: PropTypes.string,
      input: PropTypes.string,
      inputElement: PropTypes.string,
      required: PropTypes.string,
      sbar: PropTypes.string,
      sinputContainer: PropTypes.string,
      slabel: PropTypes.string,
      withIcon: PropTypes.string
    }),
    value: PropTypes.any,
    // initial field value
    valueComponent: PropTypes.func,
    // value component to render
    valueKey: PropTypes.string,
    // path of the label value in option objects
    valueRenderer: PropTypes.func,
    // valueRenderer: function (option) {}
    // optional style to apply to the component wrapper
    wrapperStyle: PropTypes.object
  };

  static defaultProps = {
    addLabelText: 'Add "{label}"?',
    arrowRenderer: defaultArrowRenderer,
    autosize: true,
    backspaceRemoves: true,
    backspaceToRemoveMessage: 'Press backspace to remove {label}',
    clearable: true,
    clearAllText: 'Clear all',
    clearRenderer: defaultClearRenderer,
    clearValueText: 'Clear value',
    deleteRemoves: true,
    delimiter: ',',
    disabled: false,
    escapeClearsValue: true,
    filterOptions: defaultFilterOptions,
    forceClearValue: false,
    ignoreAccents: true,
    ignoreCase: true,
    inputProps: {},
    isLoading: false,
    joinValues: false,
    labelKey: 'label',
    matchPos: 'any',
    matchProp: 'any',
    meta: {
      active: false,
      asyncValidating: false,
      autofilled: false,
      dirty: false,
      invalid: false,
      pristine: true,
      submitFailed: false,
      submitting: false,
      touched: false,
      valid: false,
      visited: false
    },
    menuBuffer: 0,
    menuRenderer: defaultMenuRenderer,
    multi: false,
    noResultsText: 'No results found',
    onBlurResetsInput: true,
    onCloseResetsInput: true,
    openAfterFocus: false,
    optionComponent: Option,
    pageSize: 5,
    placeholder: 'Select...',
    required: false,
    scrollMenuIntoView: true,
    searchable: true,
    simpleValue: false,
    tabSelectsValue: true,
    valueComponent: Value,
    valueKey: 'value'
  };

  constructor (props) {
    super(props);
    this.state = {
      inputValue: '',
      isFocused: false,
      isOpen: false,
      isPseudoFocused: false,
      required: false
    };
    // Error handlers
    this.hasError = this.hasError.bind(this);
    // Focus methods
    this.focus = this.focus.bind(this);
    this.focusAdjacentOption = this.focusAdjacentOption.bind(this);
    this.focusEndOption = this.focusEndOption.bind(this);
    this.focusNextOption = this.focusNextOption.bind(this);
    this.focusOption = this.focusOption.bind(this);
    this.focusPageDownOption = this.focusPageDownOption.bind(this);
    this.focusPageUpOption = this.focusPageUpOption.bind(this);
    this.focusStartOption = this.focusStartOption.bind(this);
    this.getFocusedOption = this.getFocusedOption.bind(this);
    this.selectFocusedOption = this.selectFocusedOption.bind(this);
    // Input methods
    this.blurInput = this.blurInput.bind(this);
    this.getInputValue = this.getInputValue.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    // Key methods
    this.handleKeyDown = this.handleKeyDown.bind(this);
    // Menu methods
    this.closeMenu = this.closeMenu.bind(this);
    this.handleMenuScroll = this.handleMenuScroll.bind(this);
    // Miscellaneous methods
    this.handleRequired = this.handleRequired.bind(this);
    // Mouse methods
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseDownOnArrow = this.handleMouseDownOnArrow.bind(this);
    this.handleMouseDownOnMenu = this.handleMouseDownOnMenu.bind(this);
    // Option methods
    this.filterOptions = this.filterOptions.bind(this);
    this.getFocusableOptionIndex = this.getFocusableOptionIndex.bind(this);
    this.getOptionLabel = this.getOptionLabel.bind(this);
    this.onOptionRef = this.onOptionRef.bind(this);
    // Touch methods
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchEndClearValue = this.handleTouchEndClearValue.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchOutside = this.handleTouchOutside.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.toggleTouchOutsideEvent = this.toggleTouchOutsideEvent.bind(this);
    // Value methods
    this.addValue = this.addValue.bind(this);
    this.clearValue = this.clearValue.bind(this);
    this.clearValueByForce = this.clearValueByForce.bind(this);
    this.expandValue = this.expandValue.bind(this);
    this.getResetValue = this.getResetValue.bind(this);
    this.getValueArray = this.getValueArray.bind(this);
    this.handleValueClick = this.handleValueClick.bind(this);
    this.popValue = this.popValue.bind(this);
    this.removeValue = this.removeValue.bind(this);
    this.selectValue = this.selectValue.bind(this);
    this.setValue = this.setValue.bind(this);
    // Render methods
    this.renderArrow = this.renderArrow.bind(this);
    this.renderClear = this.renderClear.bind(this);
    this.renderHiddenField = this.renderHiddenField.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.renderOuter = this.renderOuter.bind(this);
    this.renderValue = this.renderValue.bind(this);
  }

  componentWillMount () {
    this._instancePrefix = 'react-select-' + (this.props.instanceId || ++instanceId) + '-';
    const valueArray = this.getValueArray(this.props.value);

    if (this.props.required) {
      this.setState({ required: this.handleRequired(valueArray[0], this.props.multi) });
    }
  }

  componentDidMount () {
    // if (this.props.autofocus) this.focus();
    const { autofocus, inputProps } = this.props;
    if (!autofocus) {
      return;
    }
    this.focus();
    if (inputProps && inputProps.onFocus) {
      inputProps.onFocus();
    }
    return;
  }

  componentWillReceiveProps (nextProps) {
    const valueArray = this.getValueArray(nextProps.value, nextProps);

    if (nextProps.required) {
      this.setState({ required: this.handleRequired(valueArray[0], nextProps.multi) });
    }
    if (nextProps.forceClearValue) this.clearValueByForce();
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextState.isOpen !== this.state.isOpen) {
      this.toggleTouchOutsideEvent(nextState.isOpen);
      const handler = nextState.isOpen ? nextProps.onOpen : nextProps.onClose;
      handler && handler();
    }
  }

  componentDidUpdate (prevProps /* , prevState */) {
    // focus to the selected option
    if (this.menu && this.focused && this.state.isOpen && !this.hasScrolledToOption) {
      const focusedOptionNode = ReactDOM.findDOMNode(this.focused);
      const menuNode = ReactDOM.findDOMNode(this.menu);
      menuNode.scrollTop = focusedOptionNode.offsetTop;
      this.hasScrolledToOption = true;
    } else if (!this.state.isOpen) {
      this.hasScrolledToOption = false;
    }

    if (this._scrollToFocusedOptionOnUpdate && this.focused && this.menu) {
      this._scrollToFocusedOptionOnUpdate = false;
      const focusedDOM = ReactDOM.findDOMNode(this.focused);
      const menuDOM = ReactDOM.findDOMNode(this.menu);
      const focusedRect = focusedDOM.getBoundingClientRect();
      const menuRect = menuDOM.getBoundingClientRect();
      if (focusedRect.bottom > menuRect.bottom || focusedRect.top < menuRect.top) {
        menuDOM.scrollTop = focusedDOM.offsetTop
          + focusedDOM.clientHeight
          - menuDOM.offsetHeight;
      }
    }
    if (this.props.scrollMenuIntoView && this.menuContainer) {
      const menuContainerRect = this.menuContainer.getBoundingClientRect();
      if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
        window.scrollBy(
          0,
          menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight
        );
      }
    }
    if (prevProps.disabled !== this.props.disabled) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isFocused: false });
      this.closeMenu();
    }
  }

  componentWillUnmount () {
    if (!document.removeEventListener && document.detachEvent) {
      document.detachEvent('ontouchstart', this.handleTouchOutside);
    } else {
      document.removeEventListener('touchstart', this.handleTouchOutside);
    }
  }

  /*
  *
  *
  * Custom methods
  *
  *
  */

  /*
  *
  * Error methods & handlers
  *
  */
  hasError () {
    const { meta } = this.props;
    // `meta` exists, there is an error to display, and the field was interacted with
    return meta
      && meta.error
      && meta.touched
      ? true
      : false;
  }

  /*
  *
  * `Focus` methods
  *
  */
  focus () {
    if (!this.input) return;

    this.input.focus();

    if (this.props.openAfterFocus) {
      this.setState({ isOpen: true });
    }
  }

  focusAdjacentOption (dir) {
    const options = this._visibleOptions
      .map((option, index) => ({ option, index }))
      .filter(option => !option.option.disabled);
    this._scrollToFocusedOptionOnUpdate = true;
    if (!this.state.isOpen) {
      this.setState({
        isOpen: true,
        inputValue: '',
        focusedOption: this._focusedOption
          || (options.length ? options[dir === 'next' ? 0 : options.length - 1].option : null)
      });
      return;
    }
    if (!options.length) return;
    let focusedIndex = -1;
    for (let i = 0; i < options.length; i++) {
      if (this._focusedOption === options[i].option) {
        focusedIndex = i;
        break;
      }
    }
    if (dir === 'next' && focusedIndex !== -1) {
      focusedIndex = (focusedIndex + 1) % options.length;
    } else if (dir === 'previous') {
      if (focusedIndex > 0) {
        focusedIndex = focusedIndex - 1;
      } else {
        focusedIndex = options.length - 1;
      }
    } else if (dir === 'start') {
      focusedIndex = 0;
    } else if (dir === 'end') {
      focusedIndex = options.length - 1;
    } else if (dir === 'page_up') {
      const potentialIndex = focusedIndex - this.props.pageSize;
      if (potentialIndex < 0) {
        focusedIndex = 0;
      } else {
        focusedIndex = potentialIndex;
      }
    } else if (dir === 'page_down') {
      const potentialIndex = focusedIndex + this.props.pageSize;
      if (potentialIndex > options.length - 1) {
        focusedIndex = options.length - 1;
      } else {
        focusedIndex = potentialIndex;
      }
    }

    if (focusedIndex === -1) {
      focusedIndex = 0;
    }

    this.setState({
      focusedIndex: options[focusedIndex].index,
      focusedOption: options[focusedIndex].option
    });
  }

  focusEndOption () {
    this.focusAdjacentOption('end');
  }

  focusNextOption () {
    this.focusAdjacentOption('next');
  }

  focusOption (option) {
    this.setState({ focusedOption: option });
  }

  focusPageDownOption () {
    this.focusAdjacentOption('page_down');
  }

  focusPageUpOption () {
    this.focusAdjacentOption('page_up');
  }

  focusPreviousOption () {
    this.focusAdjacentOption('previous');
  }

  focusStartOption () {
    this.focusAdjacentOption('start');
  }

  getFocusedOption () {
    return this._focusedOption;
  }

  selectFocusedOption () {
    if (this._focusedOption) {
      return this.selectValue(this._focusedOption);
    }
  }

  /*
  *
  * <input> Events
  *
  */
  blurInput () {
    if (!this.input) return;

    this.input.blur();
  }

  getInputValue () {
    return this.state.inputValue;
  }

  handleInputBlur (event) {
    // The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
    if (
      this.menu
        && (this.menu === document.activeElement || this.menu.contains(document.activeElement))
    ) {
      this.focus();
      return;
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
    const onBlurredState = { isFocused: false, isOpen: false, isPseudoFocused: false };
    if (this.props.onBlurResetsInput) {
      onBlurredState.inputValue = '';
    }
    this.setState(onBlurredState);
  }

  handleInputChange (event) {
    let newInputValue = event.target.value;

    if (this.state.inputValue !== event.target.value && this.props.onInputChange) {
      const nextState = this.props.onInputChange(newInputValue);
      // Note: != used deliberately here to catch undefined and null
      if (nextState !== null && typeof nextState !== 'object') {
        newInputValue = '' + nextState;
      }
    }

    this.setState({ isOpen: true, isPseudoFocused: false, inputValue: newInputValue });
  }

  handleInputFocus (event) {
    if (this.props.disabled) return;
    const isOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
    this.setState({ isFocused: true, isOpen });
    this._openAfterFocus = false;
  }

  /*
  *
  * Key Events
  *
  */
  handleKeyDown (event) {
    if (this.props.disabled) return;

    if (typeof this.props.onInputKeyDown === 'function') {
      this.props.onInputKeyDown(event);
      if (event.defaultPrevented) {
        return;
      }
    }

    switch (event.keyCode) {
      case 8:
        // backspace
        if (!this.state.inputValue && this.props.backspaceRemoves) {
          event.preventDefault();
          this.popValue();
        }
        return;
      case 9:
        // tab
        if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
          return;
        }
        this.selectFocusedOption();
        return;
      case 13:
        // enter
        if (!this.state.isOpen) return;
        event.stopPropagation();
        this.selectFocusedOption();
        break;
      case 27:
        // escape
        if (this.state.isOpen) {
          this.closeMenu();
          event.stopPropagation();
        } else if (this.props.clearable && this.props.escapeClearsValue) {
          this.clearValue(event);
          event.stopPropagation();
        }
        break;
      case 38:
        // up
        this.focusPreviousOption();
        break;
      case 40:
        // down
        this.focusNextOption();
        break;
      case 33:
        // page up
        this.focusPageUpOption();
        break;
      case 34:
        // page down
        this.focusPageDownOption();
        break;
      case 35:
        // end key
        if (event.shiftKey) {
          return;
        }
        this.focusEndOption();
        break;
      case 36:
        // home key
        if (event.shiftKey) {
          return;
        }
        this.focusStartOption();
        break;
      case 46:
        // backspace
        if (!this.state.inputValue && this.props.deleteRemoves) {
          event.preventDefault();
          this.popValue();
        }
        return;
      default:
        return;
    }
    event.preventDefault();
  }

  /*
  *
  * Menu Events
  *
  */
  closeMenu () {
    const { multi, onCloseResetsInput } = this.props;
    const { inputValue, isFocused } = this.state;
    this.setState({
      inputValue: onCloseResetsInput ? '' : inputValue,
      isOpen: false,
      isPseudoFocused: isFocused && !multi
    });
    this.hasScrolledToOption = false;
  }

  handleMenuScroll (event) {
    const { onMenuScrollToBottom } = this.props;
    if (!onMenuScrollToBottom) return;
    const { target } = event;
    if (
      target.scrollHeight > target.offsetHeight
        && !(target.scrollHeight - target.offsetHeight - target.scrollTop)
    ) {
      onMenuScrollToBottom();
    }
  }

  /*
  * Misc. Events
  */
  handleRequired (value, multi) {
    if (!value) return true;
    return multi ? value.length === 0 : Object.keys(value).length === 0;
  }

  /*
  *
  * Mouse Events
  *
  */
  handleMouseDown (event) {
    // if the event was triggered by a mousedown and not the primary
    // button, or if the component is disabled, ignore it.
    if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
      return;
    }

    if (event.target.tagName === 'INPUT') {
      return;
    }

    // prevent default event handlers
    event.stopPropagation();
    event.preventDefault();

    // for the non-searchable select, toggle the menu
    if (!this.props.searchable) {
      this.focus();
      return this.setState({ isOpen: !this.state.isOpen });
    }

    if (this.state.isFocused) {
      // On iOS, we can get into a state where we think the input is focused but it isn't really,
      // since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
      // Call focus() again here to be safe.
      this.focus();

      let input = this.input;
      if (typeof input.getInput === 'function') {
        // Get the actual DOM input if the ref is an <AutosizeInput /> component
        input = input.getInput();
      }

      // clears the value so that the cursor will be at the end of input when the component re-renders
      input.value = '';

      // if the input is focused, ensure the menu is open
      this.setState({ isOpen: true, isPseudoFocused: false });
    } else {
      // otherwise, focus the input and open the menu
      this._openAfterFocus = this.props.openOnFocus;
      this.focus();
    }
  }

  handleMouseDownOnArrow (event) {
    // if the event was triggered by a mousedown and not the primary
    // button, or if the component is disabled, ignore it.
    if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    // If the menu isn't open, let the event bubble to the main handleMouseDown
    if (!this.state.isOpen) {
      return;
    }
    // prevent default event handlers
    event.stopPropagation();
    event.preventDefault();
    // close the menu
    this.closeMenu();
  }

  handleMouseDownOnMenu (event) {
    // if the event was triggered by a mousedown and not the primary
    // button, or if the component is disabled, ignore it.
    if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();

    this._openAfterFocus = true;
    this.focus();
  }

  /*
  *
  * Option Methods
  *
  */
  filterOptions (excludeOptions) {
    const filterValue = this.state.inputValue;
    const options = this.props.options || [];

    if (!this.props.filterOptions) return options;

    // Maintain backwards compatibility with boolean attribute
    const filterOptions = typeof this.props.filterOptions === 'function'
      ? this.props.filterOptions
      : defaultFilterOptions;

    return filterOptions(options, filterValue, excludeOptions, {
      filterOption: this.props.filterOption,
      ignoreAccents: this.props.ignoreAccents,
      ignoreCase: this.props.ignoreCase,
      labelKey: this.props.labelKey,
      matchPos: this.props.matchPos,
      matchProp: this.props.matchProp,
      valueKey: this.props.valueKey
    });
  }

  getFocusableOptionIndex (selectedOption) {
    const options = this._visibleOptions;
    if (!options.length) return null;

    const focusedOption = this.state.focusedOption || selectedOption;
    if (focusedOption && !focusedOption.disabled) {
      const focusedOptionIndex = options.indexOf(focusedOption);
      if (focusedOptionIndex !== -1) {
        return focusedOptionIndex;
      }
    }

    for (let i = 0; i < options.length; i++) {
      if (!options[i].disabled) return i;
    }
    return null;
  }

  getOptionLabel (op) {
    return op[this.props.labelKey];
  }

  onOptionRef (ref, isFocused) {
    if (isFocused) {
      this.focused = ref;
    }
  }

  /*
  *
  * Touch Events
  *
  */
  handleTouchEnd (event) {
    // Check if the view is being dragged, In this case
    // we don't want to fire the click event (because the user only wants to scroll)
    if (this.dragging) return;

    // Fire the mouse events
    this.handleMouseDown(event);
  }

  handleTouchEndClearValue (event) {
    // Check if the view is being dragged, In this case
    // we don't want to fire the click event (because the user only wants to scroll)
    if (this.dragging) return;

    // Clear the value
    this.clearValue(event);
  }

  // eslint-disable-next-line no-unused-vars
  handleTouchMove (event) {
    // Set a flag that the view is being dragged
    this.dragging = true;
  }

  handleTouchOutside (event) {
    // handle touch outside on ios to dismiss menu
    if (this.wrapper && !this.wrapper.contains(event.target)) {
      this.closeMenu();
    }
  }

  // eslint-disable-next-line no-unused-vars
  handleTouchStart (event) {
    // Set a flag that the view is not being dragged
    this.dragging = false;
  }

  toggleTouchOutsideEvent (enabled) {
    if (enabled) {
      if (!document.addEventListener && document.attachEvent) {
        document.attachEvent('ontouchstart', this.handleTouchOutside);
      } else {
        document.addEventListener('touchstart', this.handleTouchOutside);
      }
      return;
    }
    // Disabled
    if (!document.removeEventListener && document.detachEvent) {
      document.detachEvent('ontouchstart', this.handleTouchOutside);
    } else {
      document.removeEventListener('touchstart', this.handleTouchOutside);
    }
    return;
  }

  /*
  *
  * `Value` Methods
  *
  */
  addValue (value) {
    const valueArray = this.getValueArray(this.props.value);
    const visibleOptions = this._visibleOptions.filter(val => !val.disabled);
    const lastValueIndex = visibleOptions.indexOf(value);
    this.setValue(valueArray.concat(value));
    if (visibleOptions.length - 1 === lastValueIndex) {
      // the last option was selected; focus the second-last one
      this.focusOption(visibleOptions[lastValueIndex - 1]);
    } else if (visibleOptions.length > lastValueIndex) {
      // focus the option below the selected one
      this.focusOption(visibleOptions[lastValueIndex + 1]);
    }
  }

  clearValue (event) {
    // if the event was triggered by a mousedown and not the primary
    // button, ignore it.
    if (event && event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    this.setValue(this.getResetValue());
    this.setState({ isOpen: false, inputValue: '' }, this.focus);
  }

  clearValueByForce () {
    /*
    * We don't want to focus the element because another
    * component (a different `this`) requested a reset!
    * - From `clearValue()`:
    *   ...
    *   this.setValue(this.getResetValue());
    *   this.setState({ isOpen: false, inputValue: '' }, this.focus);
    */
    this.setValue(this.getResetValue());
    this.setState({ isOpen: false, inputValue: '' });
  }

  /**
	 * Retrieve a value from the given options and valueKey
	 * @param	{String|Number|Array}	value	- the selected value(s)
	 * @param	{Object}		props	- the Select component's props (or nextProps)
	 */
  expandValue (value, props) {
    const valueType = typeof value;
    if (valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') {
      return value;
    }
    const { options, valueKey } = props;
    if (!options) return;
    for (let i = 0; i < options.length; i++) {
      if (options[i][valueKey] === value) return options[i];
    }
  }

  getResetValue () {
    if (this.props.resetValue !== undefined) {
      return this.props.resetValue;
    } else if (this.props.multi) {
      return [];
    } else {
      return null;
    }
  }

  /**
	 * Turns a value into an array from the given options
	 * @param	{String|Number|Array}	value		- the value of the select input
	 * @param	{Object}		nextProps	- optionally specify the nextProps so the returned array uses the latest configuration
	 * @returns	{Array}	the value of the select represented in an array
	 */
  getValueArray (value, nextProps) {
    let newValue = value;
    /** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
    const props = typeof nextProps === 'object' ? nextProps : this.props;
    if (props.multi) {
      if (typeof newValue === 'string') newValue = newValue.split(props.delimiter);
      if (!Array.isArray(newValue)) {
        if (newValue === null || newValue === undefined) return [];
        newValue = [ newValue ];
      }
      return newValue
        .map(val => this.expandValue(val, props))
        .filter(i => i);
    }
    const expandedValue = this.expandValue(value, props);
    return expandedValue ? [ expandedValue ] : [];
  }

  handleValueClick (option, event) {
    if (!this.props.onValueClick) return;
    this.props.onValueClick(option, event);
  }

  popValue () {
    const valueArray = this.getValueArray(this.props.value);
    if (!valueArray.length) return;
    if (valueArray[valueArray.length - 1].clearableValue === false) return;
    this.setValue(valueArray.slice(0, valueArray.length - 1));
  }

  removeValue (value) {
    const valueArray = this.getValueArray(this.props.value);
    this.setValue(valueArray.filter(i => i !== value));
    this.focus();
  }

  selectValue (value) {
    const newValue = value;
    // NOTE: update value in the callback to make sure the input value
    // is empty so that there are no styling issues (Chrome had issue otherwise)
    this.hasScrolledToOption = false;
    if (this.props.multi) {
      this.setState({ inputValue: '', focusedIndex: null }, () => {
        this.addValue(newValue);
      });
    } else {
      this.setState(
        {
          isOpen: false,
          // inputValue: newValue,
          inputValue: '',
          isPseudoFocused: this.state.isFocused
        },
        () => {
          this.setValue(newValue);
        }
      );
    }
  }

  setValue (value) {
    let newValue = value;
    if (this.props.autoBlur) {
      this.blurInput();
    }
    if (!this.props.onChange) return;
    if (this.props.required) {
      const required = this.handleRequired(newValue, this.props.multi);
      this.setState({ required });
    }
    if (this.props.simpleValue && newValue) {
      newValue = this.props.multi
        ? newValue.map(i => i[this.props.valueKey]).join(this.props.delimiter)
        : newValue[this.props.valueKey];
    }
    this.props.onChange(newValue);
  }

  /*
  *
  * Render Methods
  *
  */
  renderArrow () {
    const onMouseDown = this.handleMouseDownOnArrow;
    const isOpen = this.state.isOpen;
    const arrow = this.props.arrowRenderer({ onMouseDown, isOpen });

    return (
      <span className="Select-arrow-zone" onMouseDown={onMouseDown}>
        {arrow}
      </span>
    );
  }

  renderClear () {
    const {
      clearable,
      clearAllText,
      clearRenderer,
      clearRendererFull,
      clearValueText,
      disabled,
      isLoading,
      multi,
      value
    } = this.props;

    if (!clearable
        || (!value || value === 0)
        || multi && !value.length
        || disabled
        || isLoading
    ) { return; }
    // const clear = this.props.clearRenderer();

    if (clearRendererFull) return clearRendererFull();

    return (
      <span
        aria-label={multi ? clearAllText : clearValueText}
        className="Select-clear-zone"
        onMouseDown={this.clearValue}
        onTouchEnd={this.handleTouchEndClearValue}
        onTouchMove={this.handleTouchMove}
        onTouchStart={this.handleTouchStart}
        title={multi ? clearAllText : clearValueText}
      >
        {clearRenderer()}
      </span>
    );
  }

  renderHiddenField (valueArray) {
    if (!this.props.name) return;
    if (this.props.joinValues) {
      const value = valueArray
        .map(i => stringifyValue(i[this.props.valueKey]))
        .join(this.props.delimiter);
      return (
        <input
          type="hidden"
          ref={ref => {
              this.value = ref;
              return;
            }}
          name={this.props.name}
          value={value}
          disabled={this.props.disabled}
        />
      );
    }
    return valueArray.map((item, index) => (
      <input
        key={'hidden.' + index}
        type="hidden"
        ref={'value' + index}
        name={this.props.name}
        value={stringifyValue(item[this.props.valueKey])}
        disabled={this.props.disabled}
      />
    ));
  }

  renderInput (valueArray, focusedOptionIndex, placeholderText) {
    const className = classNames('Select-input', this.props.inputProps.className);
    const isOpen = !!this.state.isOpen;

    const ariaOwns = classNames({
      [this._instancePrefix + '-list']: isOpen,
      [this._instancePrefix + '-backspace-remove-message']: this.props.multi
        && !this.props.disabled
        && this.state.isFocused
        && !this.state.inputValue
    });

    const inputProps = Object.assign({}, this.props.inputProps, {
      'aria-activedescendant': isOpen
        ? this._instancePrefix + '-option-' + focusedOptionIndex
        : this._instancePrefix + '-value',
      'aria-expanded': '' + isOpen,
      'aria-owns': ariaOwns,
      'aria-haspopup': '' + isOpen,
      'aria-labelledby': this.props['aria-labelledby'],
      'aria-label': this.props['aria-label'],
      className,
      onBlur: this.handleInputBlur,
      onChange: this.handleInputChange,
      onFocus: this.handleInputFocus,
      ref: ref => {
        this.input = ref;
        return;
      },
      required: this.state.required,
      role: 'combobox',
      tabIndex: this.props.tabIndex,
      value: this.state.inputValue
    });

    if (this.props.inputRenderer) {
      return this.props.inputRenderer(inputProps);
    }

    if (this.props.disabled || !this.props.searchable) {
      // eslint-disable-next-line no-unused-vars
      const { inputClassName, ...divProps } = this.props.inputProps;
      return (
        <div className="Select-container">
          <input
            aria-activedescendant={
              isOpen
                ? this._instancePrefix + '-option-' + focusedOptionIndex
                : this._instancePrefix + '-value'
            }
            aria-expanded={isOpen}
            aria-owns={isOpen ? this._instancePrefix + '-list' : this._instancePrefix + '-value'}
            aria-readonly={'' + !!this.props.disabled}
            className={className}
            disabled={this.props.disabled}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}
            ref={ref => {
                this.input = ref;
                return;
              }}
            role="combobox"
            tabIndex={this.props.tabIndex || 0}
            {...divProps}
          />
          <span className="Select-bar" />
          <label className="Select-label">
            {placeholderText}
            {this.renderRequired()}
          </label>
        </div>
      );
    }

    if (this.props.autosize) {
      return <AutosizeInput {...inputProps} minWidth="5" />;
    }

    return (
      <div className={`Select-container ${this.hasError() ? 'is-error' : ''}`}>
        <input {...inputProps} />
        <span className="Select-bar" />
        <label className="Select-label">
          {placeholderText}
          {this.renderRequired()}
        </label>
        {
          this.hasError()
          ? <span className="Select-error">
              <span className="Select-error-message">
                {this.props.meta.error}
              </span>
            </span>
          : null
        }
      </div>
    );
  }

  renderLoading () {
    if (!this.props.isLoading) return;
    return (
      <span className="Select-loading-zone" aria-hidden="true">
        <span className="Select-loading" />
      </span>
    );
  }

  renderMenu (options, valueArray, focusedOption) {
    if (options && options.length) {
      return this.props.menuRenderer({
        focusedOption,
        focusOption: this.focusOption,
        instancePrefix: this._instancePrefix,
        labelKey: this.props.labelKey,
        onFocus: this.focusOption,
        onSelect: this.selectValue,
        optionClassName: this.props.optionClassName,
        optionComponent: this.props.optionComponent,
        optionRenderer: this.props.optionRenderer || this.getOptionLabel,
        options,
        selectValue: this.selectValue,
        valueArray,
        valueKey: this.props.valueKey,
        onOptionRef: this.onOptionRef
      });
    } else if (this.props.noResultsText) {
      return (
        <div className="Select-noresults">
          {this.props.noResultsText}
        </div>
      );
    }
    return null;
  }

  renderOuter (options, valueArray, focusedOption) {
    const menu = this.renderMenu(options, valueArray, focusedOption);
    if (!menu) return null;
    return (
      <div
        ref={ref => {
            this.menuContainer = ref;
            return;
          }}
        className="Select-menu-outer"
        style={this.props.menuContainerStyle}
      >
        <div
          ref={ref => {
              this.menu = ref;
              return;
            }}
          role="listbox"
          className="Select-menu"
          id={this._instancePrefix + '-list'}
          style={this.props.menuStyle}
          onScroll={this.handleMenuScroll}
          onMouseDown={this.handleMouseDownOnMenu}
        >
          {menu}
        </div>
      </div>
    );
  }

  renderRequired () {
    return this.props.required ? <span className="Select-required" /> : null;
  }

  renderValue (valueArray, isOpen) {
    const renderLabel = this.props.valueRenderer || this.getOptionLabel;
    const ValueComponent = this.props.valueComponent;
    if (!valueArray.length && !this.state.inputValue) {
      return null;
    }
    let onClick = this.props.onValueClick ? this.handleValueClick : null;
    if (this.props.multi) {
      return valueArray.map((value, i) => {
        return (
          <ValueComponent
            disabled={this.props.disabled || value.clearableValue === false}
            id={this._instancePrefix + '-value-' + i}
            instancePrefix={this._instancePrefix}
            key={`value-${i}-${value[this.props.valueKey]}`}
            onClick={onClick}
            onRemove={this.removeValue}
            value={value}
          >
            {renderLabel(value, i)}
            <span className="Select-aria-only" />
          </ValueComponent>
        );
      });
    } else if (!this.state.inputValue) {
      if (isOpen) onClick = null;
      return (
        <ValueComponent
          disabled={this.props.disabled}
          id={this._instancePrefix + '-value-item'}
          instancePrefix={this._instancePrefix}
          onClick={onClick}
          value={valueArray[0]}
        >
          {renderLabel(valueArray[0])}
        </ValueComponent>
      );
    }
  }
  render () {
    const valueArray = this.getValueArray(this.props.value);
    const options = this._visibleOptions = this.filterOptions(
      this.props.multi ? this.getValueArray(this.props.value) : null
    );
    let isOpen = this.state.isOpen;
    if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) {
      isOpen = false;
    }
    const focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

    let focusedOption = null;
    if (focusedOptionIndex !== null) {
      focusedOption = this._focusedOption = options[focusedOptionIndex];
    } else {
      focusedOption = this._focusedOption = null;
    }
    const className = classNames('Select', this.props.className, {
      'Select--multi': this.props.multi,
      'Select--single': !this.props.multi,
      'is-disabled': this.props.disabled,
      'is-focused': this.state.isFocused,
      'is-loading': this.props.isLoading,
      'is-open': isOpen,
      'is-pseudo-focused': this.state.isPseudoFocused,
      'is-searchable': this.props.searchable,
      'has-value': valueArray.length
    });

    let removeMessage = null;
    if (
      this.props.multi
      && !this.props.disabled
      && valueArray.length
      && !this.state.inputValue
      && this.state.isFocused
      && this.props.backspaceRemoves
    ) {
      removeMessage = (
        <span
          id={this._instancePrefix + '-backspace-remove-message'}
          className="Select-aria-only"
          aria-live="assertive"
        >
          {
            this.props.backspaceToRemoveMessage.replace(
              '{label}',
              valueArray[valueArray.length - 1][this.props.labelKey]
            )
          }
        </span>
      );
    }

    return (
      <div
        ref={ref => {
            this.wrapper = ref;
            return;
          }}
        className={className}
        style={this.props.wrapperStyle}
      >
        {this.renderHiddenField(valueArray)}
        <div
          className="Select-control"
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMouseDown}
          onTouchEnd={this.handleTouchEnd}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          ref={ref => {
              this.control = ref;
              return;
            }}
          style={this.props.style}
        >
          <span className="Select-multi-value-wrapper" id={this._instancePrefix + '-value'}>
            {this.renderValue(valueArray, isOpen)}
            {this.renderInput(valueArray, focusedOptionIndex, this.props.placeholder)}
          </span>
          {removeMessage}
          {this.renderLoading()}
          {this.renderClear()}
          {this.renderArrow()}
        </div>
        {
          isOpen
            ? this.renderOuter(options, !this.props.multi ? valueArray : null, focusedOption)
            : null
        }
      </div>
    );
  }
}

export default Select;
