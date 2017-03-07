import * as React, { PropTypes } from "react";
import ReactToolbox from "../index";

export interface OptionTheme {
  /**
   * Used for a suggestion when it's active.
   */
  active?: string;
}

export interface OptionProps extends ReactToolbox.Props {

  /**
  * Replaces the placeholder while options are loading
  */
  children: React.ReactNode,

  /**
  * className (based on mouse position)
  */
  className?: string;

  /**
  * Unique prefix for the ids (used for aria)
  */
  instancePrefix?: string;

  /**
  * The option is disabled
  */
  isDisabled?: boolean;

  /**
  * The option is focused
  */
  isFocused?: boolean;

  /**
  * The option is selected
  */
  isSelected?: boolean;

  /**
  * Method to handle mouseEnter on option element
  */
  onFocus?: Function;

  /**
  * Method to handle click on option element
  */
  onSelect?: Function;

  /**
  * Method to handle mouseLeave on option element
  */
  onUnfocus?: Function;

  /**
  * Object that is base for that option
  */
  option?: any;

  /**
  * Index of the option, used to generate unique ids for aria
  */
  optionIndex?: number;

  /**
   * Classnames object defining the component style.
   */
  theme?: OptionTheme;

  /**
   * Additional properties passed to inner Option component.
   */
  [key: string]: any;
}

export class Option extends React.Component<OptionProps, {}> { }

export default Option;
