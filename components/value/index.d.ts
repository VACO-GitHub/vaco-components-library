import * as React from "react";
import ReactToolbox from "../index";

export interface ValueTheme {
  /**
   * Used for a suggestion when it's active.
   */
  active?: string;
}

export interface ValueProps extends ReactToolbox.Props {
  /**
   * Child function responsible for creating the inner `Value` component.
   */
  children?: React.ReactNode;

  /**
   * Disabled prop passed to ReactSelect
   */
  disabled?: boolean;

  /**
   * Unique id for the value - used for aria
   */
  id?: string;

  /**
   * Method to handle click on value label
   */
  onClick?: Function;

  /**
   * Method to handle removal of the value
   */
  onRemove?: Function;

  /**
   * The option object for this value
   */
  value: PropTypes.object.isRequired

  /**
   * Classnames object defining the component style.
   */
  theme?: SelectTheme;

  /**
   * Additional properties passed to inner Select component.
   */
  [key: string]: any;
}

export class Value extends React.Component<ValueProps, {}> { }

export default Value;
