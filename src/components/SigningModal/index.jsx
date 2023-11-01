import React from 'react';
import PropTypes from 'prop-types';
import {
  approveEIP155Request,
  rejectEIP155Request,
} from '../../services/walletConnect/web3wallet/eip155Requests';
import { web3wallet } from '../../services/walletConnect/web3wallet/walletConnectUtils';
import { getSignParamsMessage } from '../../services/walletConnect/web3wallet/helpers';
import { Modal } from '../Modal';
import { Heading } from '../Heading';
import { Button } from '../Button';
import { useWalletContext } from '../../store/wallet';
import { isJson } from '../../utils/helper';
import {
  EIP155_CHAINS,
  EIP155_SIGNING_NAME,
} from '../../services/walletConnect/web3wallet/eip155Lib';

export const SigningModal = ({
  requestSession,
  requestEvent,
  setRequestSession,
  setRequestEvent,
}) => {
  const { verifiedWallet } = useWalletContext();

  if (!requestEvent || !requestSession) return null;

  const chainID = requestEvent?.params?.chainId?.toUpperCase();
  const method = requestEvent?.params?.request?.method;
  const message = getSignParamsMessage(requestEvent?.params?.request?.params);

  // Format message data based on data-type
  const formattedMessage = isJson(message)
    ? typeof message === 'object'
      ? JSON.stringify(message, null, 2)
      : JSON.stringify(JSON.parse(message), null, 2)
    : message;

  const requestName = requestSession?.peer?.metadata?.name;
  const requestIcon = requestSession?.peer?.metadata?.icons[0];
  const requestURL = requestSession?.peer?.metadata?.url;
  const requestProtocol = requestSession?.relay?.protocol;

  const { topic } = requestEvent;

  const onApprove = async () => {
    if (requestEvent) {
      const response = await approveEIP155Request(verifiedWallet, requestEvent);
      await web3wallet.respondSessionRequest({
        topic,
        response,
      });

      setRequestSession('');
      setRequestEvent('');
    }
  };

  const onReject = async () => {
    if (requestEvent) {
      const response = rejectEIP155Request(requestEvent);
      await web3wallet.respondSessionRequest({
        topic,
        response,
      });

      setRequestSession('');
      setRequestEvent('');
    }
  };

  return (
    <Modal open>
      <Heading title={EIP155_SIGNING_NAME[method]} />

      <div className='mt-10 max-w-[400px]'>
        <div className='flex gap-4 items-center'>
          <img
            src={requestIcon}
            alt={requestName}
            className='w-10 h-10 rounded-full object-cover'
          />

          <div className='flex flex-col gap-1'>
            <label className='text-gray-600 text-md font-medium'>
              {requestName}
            </label>
            <a
              href={requestURL}
              target='_blank'
              className='text-sky-500 hover:text-sky-600'
              rel='noreferrer'
            >
              {requestURL}
            </a>
          </div>
        </div>

        <div className='flex flex-col gap-10 mt-5'>
          <div>
            <p className='font-semibold text-lg text-gray-600 mt-6 mb-3'>
              Data
            </p>

            <div className='pl-4 border-box'>
              <pre className='text-gray-500 whitespace-pre-wrap'>
                {formattedMessage}
              </pre>
            </div>
          </div>

          <div>
            <p className='font-semibold text-lg text-gray-600 mt-6 mb-3'>
              Extra Information
            </p>

            <div className='pl-4 border-box'>
              <p className='font-semibold text-lg text-gray-600 mt-6 mb-3'>
                Blockchain
              </p>
              <label className='font-semibold text-md text-gray-500'>
                {EIP155_CHAINS[chainID.toLowerCase()]?.name || chainID}
              </label>

              <p className='font-semibold text-lg text-gray-600 mt-6 mb-3'>
                Methods
              </p>
              <label className='font-semibold text-md text-gray-500'>
                {method}
              </label>

              <p className='font-semibold text-lg text-gray-600 mt-6 mb-3'>
                Relay Protocol
              </p>
              <label className='font-semibold text-md text-gray-500'>
                {requestProtocol}
              </label>
            </div>
          </div>
        </div>

        <div className='mt-12 flex justify-end items-center gap-3'>
          <Button
            title='Approve'
            onClick={onApprove}
            variant='success'
          />
          <Button
            title='Reject'
            onClick={onReject}
            variant='error'
          />
        </div>
      </div>
    </Modal>
  );
};

SigningModal.propTypes = {
  requestSession: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
  requestEvent: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
  setRequestSession: PropTypes.func.isRequired,
  setRequestEvent: PropTypes.func.isRequired,
};
