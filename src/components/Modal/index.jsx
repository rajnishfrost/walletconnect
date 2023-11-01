import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '../Container';

export const Modal = ({ children, open }) => {
  if (!open) {
    return;
  }

  return (
    <div className='fixed left-0 right-0 top-0 botton-0 z-9999 bg-gray-200/50 [&>div>div]:h-auto [&>div>div]:w-auto [&>div>div]:max-h-[80%] [&>div>div]:min-w-[250px] [&>div>div]:overflow-y-auto [&>div>div]:overflow-x-auto'>
      <Container>{children}</Container>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};
