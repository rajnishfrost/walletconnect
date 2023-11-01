import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export const Input = ({ name, value, placeholder, customStyle, onChange }) => {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cx(
        'rounded-lg border border-cyan-500 px-3 py-2 focus:border-cyan-600 outline-0 text-gray-600',
        customStyle
      )}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  customStyle: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
