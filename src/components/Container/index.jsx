import React from 'react';
import PropTypes from 'prop-types';

export const Container = ({ children }) => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='h-[80%] w-[500px] px-6 pt-10 pb-8 bg-white shadow-xl rounded-lg shadow-xl ring-1 ring-gray-900/5'>
        {children}
      </div>
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};
