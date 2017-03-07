import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Option extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string, // className (based on mouse position)
    instancePrefix: PropTypes.string.isRequired, // unique prefix for the ids (used for aria)
    isDisabled: PropTypes.bool, // the option is disabled
    isFocused: PropTypes.bool, // the option is focused
    isSelected: PropTypes.bool, // the option is selected
    onFocus: PropTypes.func, // method to handle mouseEnter on option element
    onSelect: PropTypes.func, // method to handle click on option element
    onUnfocus: PropTypes.func, // method to handle mouseLeave on option element
    option: PropTypes.object.isRequired, // object that is base for that option
    optionIndex: PropTypes.number, // index of the option, used to generate unique ids for aria
    theme: PropTypes.shape({
      active: PropTypes.string
    })
  };

  /*
  *
  *
  * Custom Methods
  *
  *
  */
  blockEvent (event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.tagName !== 'A' || !('href' in event.target)) {
      return;
    }
    if (event.target.target) {
      window.open(event.target.href, event.target.target);
    } else {
      window.location.href = event.target.href;
    }
  }

  /*
  *
  * Mouse Events
  *
  */
  handleMouseDown (event) {
    event.preventDefault();
    event.stopPropagation();

    const { onSelect, option } = this.props;

    onSelect(option, event);
  }

  handleMouseEnter (event) {
    this.onFocus(event);
  }

  handleMouseMove (event) {
    this.onFocus(event);
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

    this.handleMouseDown(event);
  }

  // eslint-disable-next-line no-unused-vars
  handleTouchMove (event) {
    // Set a flag that the view is being dragged
    this.dragging = true;
  }

  // eslint-disable-next-line no-unused-vars
  handleTouchStart (event) {
    // Set a flag that the view is not being dragged
    this.dragging = false;
  }

  render () {
    const { children, option, instancePrefix, optionIndex } = this.props;
    const className = classNames(this.props.className, option.className);

    return option.disabled
      ? <div className={className} onMouseDown={this.blockEvent} onClick={this.blockEvent}>
          {children}
        </div>
      : <div
          className={className}
          style={option.style}
          role="option"
          onMouseDown={this.handleMouseDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseMove={this.handleMouseMove}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          id={instancePrefix + '-option-' + optionIndex}
          title={option.title}
        >
          {children}
        </div>;
  }
}
