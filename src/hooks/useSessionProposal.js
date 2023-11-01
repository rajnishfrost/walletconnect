import { getSdkError } from '@walletconnect/utils';
import { useCallback, useEffect, useState } from 'react';
import { web3wallet } from '../services/walletConnect/web3wallet/walletConnectUtils';
import { useWalletContext } from '../store/wallet';

export const useSessionProposal = ({ setWcUri }) => {
  const [proposal, setProposal] = useState('');
  const [successfulSession, setSuccessfulSession] = useState(false);

  const { ethAddress } = useWalletContext();

  const onSessionProposal = useCallback((proposal) => {
    setProposal(proposal);
  }, []);

  const acceptSessionProposal = useCallback(async () => {
    if (proposal) {
      const { id, params } = proposal;
      const { requiredNamespaces, relays } = params;

      const namespaces = {};

      Object.keys(requiredNamespaces).forEach((key) => {
        const accounts = [];
        requiredNamespaces[key].chains.forEach((chain) => {
          [ethAddress].map((acc) => accounts.push(`${chain}:${acc}`));
        });

        namespaces[key] = {
          accounts,
          methods: requiredNamespaces[key].methods,
          events: requiredNamespaces[key].events,
        };
      });

      await web3wallet.approveSession({
        id,
        relayProtocol: relays[0].protocol,
        namespaces,
      });

      setWcUri('');
      setProposal(undefined);
      setSuccessfulSession(true);
    }
  }, [ethAddress, proposal]);

  const cancelSessionProposal = useCallback(async () => {
    const { id } = proposal;

    if (proposal) {
      await web3wallet.rejectSession({
        id,
        reason: getSdkError('USER_REJECTED_METHODS'),
      });

      setWcUri('');
      setProposal(undefined);
    }
  }, [proposal]);

  useEffect(() => {
    web3wallet?.on('session_proposal', onSessionProposal);
  }, [
    acceptSessionProposal,
    cancelSessionProposal,
    ethAddress,
    onSessionProposal,
    successfulSession,
  ]);

  return {
    proposal,
    successfulSession,
    acceptSessionProposal,
    cancelSessionProposal,
    setSuccessfulSession,
  };
};
