import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button';

export const WalletListItem = ({ icon, name, url, onDelete }) => {
  return (
    <div className='flex items-center justify-between px-3 py-5'>
      <div className='flex gap-4 items-center'>
        <img
          src={icon}
          alt={name}
          className='w-10 h-10 rounded-full object-cover'
        />

        <div className='flex flex-col gap-1'>
          <label className='text-gray-600 text-md font-medium'>{name}</label>
          <a
            href={url}
            target='_blank'
            className='text-sky-500 hover:text-sky-600'
            rel='noreferrer'
          >
            {url}
          </a>
        </div>
      </div>

      <Button
        title='Delete'
        variant='error'
        onClick={onDelete}
      />
    </div>
  );
};

WalletListItem.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
