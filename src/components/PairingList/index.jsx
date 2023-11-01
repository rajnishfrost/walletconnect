import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { web3wallet } from '../../services/walletConnect/web3wallet/walletConnectUtils';
import { Container } from '../Container';
import { Heading } from '../Heading';
import { Button } from '../Button';
import { WalletListItem } from '../WalletListItem';

export const PairingList = ({ onBack }) => {
  const [pairs, setPairs] = useState([]);

  const getPairingList = async () => {
    const pairs = await web3wallet.core.pairing.getPairings();

    const mappedPairs = pairs.map((pair) => ({
      name: pair?.peerMetadata?.name,
      url: pair?.peerMetadata?.url,
      icon: pair?.peerMetadata?.icons[0],
      topic: pair?.topic,
    }));

    setPairs(mappedPairs);
  };

  useEffect(() => {
    getPairingList();
  }, []);

  const disconnectPair = useCallback(async (topic) => {
    await web3wallet.core.pairing.disconnect({
      topic,
    });

    getPairingList();
  }, []);

  return (
    <Container>
      <div className='flex justify-between items-center gap-3'>
        <Button
          title='Go Back'
          variant='error'
          onClick={onBack}
        />
        <Heading title='Pairing List' />
      </div>

      <div className='flex flex-col max-h-[calc(100%-120px)] overflow-y-auto'>
        {pairs?.map((pair, pairIndex) => (
          <WalletListItem
            key={`${pairIndex}-${pair.topic}`}
            icon={pair.icon}
            name={pair.name}
            url={pair.url}
            onDelete={() => disconnectPair(pair.topic)}
          />
        ))}

        {!pairs.length && (
          <p className='text-center text-xl font-semibold text-gray-600 mt-10'>
            No Pairs Found
          </p>
        )}
      </div>
    </Container>
  );
};

PairingList.propTypes = {
  onBack: PropTypes.func.isRequired,
};
