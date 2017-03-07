import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Value extends Component {
  static displayName = 'Value';

  static propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool, // disabled prop passed to ReactSelect
    id: PropTypes.string, // Unique id for the value - used for aria
    onClick: PropTypes.func, // method to handle click on value label
    onRemove: PropTypes.func, // method to handle removal of the value
    theme: PropTypes.shape({
      active: PropTypes.string
    }),
    value: PropTypes.object.isRequired // the option object for this value
  };

  handleMouseDown (event) {
    if (event.type === 'mousedown' && event.button !== 0) {
      return;
    }

    if (this.props.onClick) {
      event.stopPropagation();
      this.props.onClick(this.props.value, event);
      return;
    }

    if (this.props.value.href) {
      event.stopPropagation();
    }
  }

  onRemove (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onRemove(this.props.value);
  }

  handleTouchEndRemove (event) {
    // Check if the view is being dragged, In this case
    // we don't want to fire the click event (because the user only wants to scroll)
    if (this.dragging) return;

    // Fire the mouse events
    this.onRemove(event);
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

  renderRemoveIcon () {
    if (this.props.disabled || !this.props.onRemove) return;
    return (
      <span
        className="Select-value-icon"
        aria-hidden="true"
        onMouseDown={this.onRemove}
        onTouchEnd={this.handleTouchEndRemove}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
      >
        &times;
      </span>
    );
  }

  renderLabel () {
    const { children, id, onClick, value: { href, target } } = this.props;
    const className = 'Select-value-label';

    return onClick || href
      ? <a
          className={className}
          href={href}
          target={target}
          onMouseDown={this.handleMouseDown}
          onTouchEnd={this.handleMouseDown}
        >
          {children}
        </a>
      : <span className={className} role="option" aria-selected="true" id={id}>
          {children}
        </span>;
  }

  render () {
    const { value: { className, style, title } } = this.props;
    return (
      <div
        className={classNames('Select-value', className)}
        style={style}
        title={title}
      >
        {this.renderRemoveIcon()}
        {this.renderLabel()}
      </div>
    );
  }
}
