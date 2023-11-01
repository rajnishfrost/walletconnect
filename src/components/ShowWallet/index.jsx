import React, { useState } from 'react';
import { Container } from '../Container';
import { Heading } from '../Heading';
import { useWalletContext } from '../../store/wallet';
import { Input } from '../Input';
import { Button } from '../Button';
import { web3WalletPair } from '../../services/walletConnect/web3wallet/walletConnectUtils';
import { PairingModal } from '../PairingModal';
import { useSessionProposal } from '../../hooks/useSessionProposal';
import { useSessionRequest } from '../../hooks/useSessionRequest';
import { SigningModal } from '../SigningModal';
import { useSessionDisconnect } from '../../hooks/useSessionDisconnect';
import { PairingList } from '../PairingList';
import { SessionList } from '../SessionList';

export const ShowWallet = () => {
  const [wcUri, setWcUri] = useState('');
  const [activeTab, setActiveTab] = useState();
  const { ethAddress } = useWalletContext();

  const {
    proposal,
    acceptSessionProposal,
    cancelSessionProposal,
    successfulSession,
    setSuccessfulSession,
  } = useSessionProposal({ setWcUri });

  const { requestEvent, requestSession, setRequestEvent, setRequestSession } =
    useSessionRequest();

  const { disconnectSessions } = useSessionDisconnect({ setSuccessfulSession });

  const handleWcUriChange = (event) => {
    setWcUri(event.target.value);
  };

  const handlePairWallet = async () => {
    await web3WalletPair({ uri: wcUri });
  };

  return (
    <>
      {activeTab === 'pairing' && <PairingList onBack={() => setActiveTab()} />}
      {activeTab === 'session' && (
        <SessionList
          onBack={() => setActiveTab()}
          setSuccessfulSession={setSuccessfulSession}
        />
      )}

      {!activeTab && (
        <Container>
          <Heading title='Wallet Information' />

          <div className='h-[calc(100%-33px)] flex flex-col justify-between'>
            <div>
              <h4 className='text-gray-900 font-semibold text-lg text-center pb-2 pt-4'>
                ETH Address
              </h4>

              <p className='text-sky-500 text-center'>{ethAddress}</p>

              <div className='flex gap-3 items-center justify-center mt-24'>
                {!successfulSession ? (
                  <>
                    <Input
                      placeholder='Enter WC URI (wc:2131...)'
                      value={wcUri}
                      onChange={handleWcUriChange}
                    />
                    <Button
                      title='Pair Wallet'
                      variant='error'
                      onClick={handlePairWallet}
                      disabled={!wcUri}
                    />
                  </>
                ) : (
                  <Button
                    title='Disconnect Current Session'
                    variant='warning'
                    onClick={disconnectSessions}
                  />
                )}
              </div>
            </div>

            <div className='flex justify-end gap-4'>
              <Button
                title='Pairings'
                variant='error'
                onClick={() => setActiveTab('pairing')}
              />
              <Button
                title='Sessions'
                variant='warning'
                onClick={() => setActiveTab('session')}
              />
            </div>
          </div>
        </Container>
      )}

      <PairingModal
        proposal={proposal}
        onAccept={acceptSessionProposal}
        onCancel={cancelSessionProposal}
      />

      <SigningModal
        requestEvent={requestEvent}
        requestSession={requestSession}
        setRequestEvent={setRequestEvent}
        setRequestSession={setRequestSession}
      />
    </>
  );
};
