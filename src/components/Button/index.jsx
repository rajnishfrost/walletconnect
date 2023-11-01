import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ title, onClick, disabled }) => {
  return (
    <button
      className='px-6 py-2 rounded-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-300'
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
