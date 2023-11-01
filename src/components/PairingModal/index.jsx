import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal';
import { Heading } from '../Heading';
import { Button } from '../Button';
import { EIP155_CHAINS } from '../../services/walletConnect/web3wallet/eip155Lib';

export const PairingModal = ({ proposal, onAccept, onCancel }) => {
  if (!proposal) {
    return;
  }
  const name = proposal?.params?.proposer?.metadata?.name;
  const url = proposal?.params?.proposer?.metadata.url;
  const methods = proposal?.params?.requiredNamespaces.eip155.methods;
  const events = proposal?.params?.requiredNamespaces.eip155.events;
  const chains = proposal?.params?.requiredNamespaces.eip155.chains;
  const icon = proposal?.params.proposer.metadata.icons[0];

  return (
    <Modal open>
      <Heading title='Session Proposal' />
      <div className='mt-10 max-w-[400px]'>
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

        <div>
          <p className='font-semibold text-lg text-gray-600 mt-6 mb-3'>
            Review eip155 permissions
          </p>

          <div>
            <label className='font-semibold text-md text-gray-600'>
              {EIP155_CHAINS[chains]?.name || chains}
            </label>

            <p className='text-gray-500 font-medium mt-1'>Methods</p>
            <label className='text-gray-400 pb-2 block'>
              {methods?.map((method) => method).join(', ')}
            </label>

            <p className='text-gray-500 font-medium mt-1'>Events</p>
            <label className='text-gray-400 pb-2'>
              {events?.map((event) => event).join(', ')}
            </label>
          </div>
        </div>

        <div className='mt-12 flex justify-end items-center gap-3'>
          <Button
            title='Cancel'
            onClick={onCancel}
            variant='error'
          />
          <Button
            title='Approve'
            onClick={onAccept}
            variant='success'
          />
        </div>
      </div>
    </Modal>
  );
};

PairingModal.propTypes = {
  proposal: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
