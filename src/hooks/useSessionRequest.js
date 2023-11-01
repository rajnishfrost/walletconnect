import { useCallback, useEffect, useState } from 'react';
import { web3wallet } from '../services/walletConnect/web3wallet/walletConnectUtils';
import { EIP155_SIGNING_METHODS } from '../services/walletConnect/web3wallet/eip155Lib';

export const useSessionRequest = () => {
  const [requestSession, setRequestSession] = useState('');
  const [requestEvent, setRequestEvent] = useState('');

  const onSessionRequest = useCallback(async (requestEvent) => {
    const { topic, params } = requestEvent;
    const { request } = params;
    const requestSessionData = web3wallet.engine.signClient.session.get(topic);

    switch (request.method) {
      case EIP155_SIGNING_METHODS.ETH_SIGN:
      case EIP155_SIGNING_METHODS.PERSONAL_SIGN:
      case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
      case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
      case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4:
      case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION:
      case EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION:
        setRequestSession(requestSessionData);
        setRequestEvent(requestEvent);
        return;

      default:
        return;
    }
  }, []);

  useEffect(() => {
    web3wallet?.on('session_request', onSessionRequest);
  }, [onSessionRequest]);

  return { requestSession, requestEvent, setRequestEvent, setRequestSession };
};
