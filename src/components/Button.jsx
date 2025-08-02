import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ 
  children, 
  onClick, 
  className = '', 
  disabled = false, 
  variant = 'default',
  loading = false,
  ...props 
}) => {
  const baseClasses = 'btn';
  const variantClass = `btn-${variant}`;
  const classes = `${baseClasses} ${variantClass} ${className}`.trim();

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'danger']),
  loading: PropTypes.bool,
};