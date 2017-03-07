import * as React, { PropTypes } from "react";
import ReactToolbox from "../index";

export interface TypeaheadTheme {
  /**
   * Used for a suggestion when it's active.
   */
  active?: string;
}

export interface TypeaheadProps extends ReactToolbox.Props {
  /**
   *  Automatically call the `loadOptions` prop on-mount.
   * @default true
   */
  autoload?: boolean;

  /**
   * Object to use to cache results. Set to null/false to disable caching
   */
  cache?: any;

  /**
   * Child function responsible for creating the inner Select component.
   * (props: Object): PropTypes.element
   */
  children?: Function;

  /**
   * Strip diacritics when filtering.
   * @default true
   */
  ignoreAccents?: boolean;

  /**
  * Perform case-insensitive filtering
   * @default true
   */
  ignoreCase?: boolean;

  /**
   * Callback to load options asynchronously; (inputValue: string, callback: Function): ?Promise
   */
  loadOptions?: Function;

  /**
   * Replaces the placeholder while options are loading
   */
  loadingPlaceholder?: string | React.ReactNode;

  /**
   * TODO - Select multiple options
   * @default false
   */
  multi?: boolean;

  /**
   * Field `noResultsText` is displayed when no options come back from the server
   */
  noResultsText?: string | React.ReactNode;

  /**
   * Handler for change events: function (newValue) {}
   */
  onChange?: Function;

  /**
   * Optional handler for keeping track of what is being typed
   */
  onInputChange?: Function;

  /**
   * Options array
   */
  options?: array;

  /**
   * Field `placeholder` is displayed when there's no value (shared with Select)
   */
  placeholder?: string | React.ReactNode;

  /**
   * Label to prompt for search input
   */
  searchPromptText?: string | React.ReactNode;

  /**
   * Classnames object defining the component style.
   */
  theme?: TypeaheadTheme;

  /**
   * Initial field value
   */
  value?: any;

  /**
   * Additional properties passed to inner Typeahead component.
   */
  [key: string]: any;
}

export class Typeahead extends React.Component<TypeaheadProps, {}> { }

export default Typeahead;
