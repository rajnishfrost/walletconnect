import React from 'react';
import PropTypes from 'prop-types';

export const Heading = ({ title }) => {
  return <h1 className='text-2xl font-semibold text-gray-900'>{title}</h1>;
};

Heading.propTypes = {
  title: PropTypes.string.isRequired,
};
