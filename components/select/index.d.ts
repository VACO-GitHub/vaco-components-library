import * as React from "react";
import ReactToolbox from "../index";

export interface SelectTheme {
  /**
   * Used for a suggestion when it's active.
   */
  active?: string;
}

export interface SelectProps extends ReactToolbox.Props {
  /**
   * Classnames object defining the component style.
   */
  theme?: SelectTheme;

  /**
   * Additional properties passed to inner Select component.
   */
  [key: string]: any;
}

export class Typeahead extends React.Component<TypeaheadProps, {}> { }

export default Typeahead;
