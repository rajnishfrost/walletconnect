import { useState, useCallback, useEffect } from 'react';
import { Core } from '@walletconnect/core';
import { Web3Wallet } from '@walletconnect/web3wallet';
export let web3wallet;

const createWeb3Wallet = async () => {
  const core = new Core({
    // eslint-disable-next-line no-undef
    projectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID,
  });

  web3wallet = await Web3Wallet.init({
    core,
    metadata: {
      name: 'Verified Network Task',
      description: 'Verified Network Task',
      url: 'https://walletconnect.com/',
      icons: ['https://avatars.githubusercontent.com/u/37784886'],
    },
  });
};

// Initialize the Web3Wallet
export const useInitialization = async () => {
  const [initialized, setInitialized] = useState(false);
  const [TU , setTU] = useState({});

  const onInitialize = useCallback(async () => {
    try {
      await createWeb3Wallet();
      setInitialized(true);
      const {topic, uri} = await web3wallet.core.pairing.create();
      setTU({topic , uri});
      if(!TU)
      await web3wallet.core.pairing.pair({ uri })
    } catch (err) {
      console.log('Error for initializing', err);
    }
  }, []);
  
  useEffect(() => {
    if (!initialized) {
      onInitialize();
    }
  }, [initialized, onInitialize]);

  return initialized;
};

export async function web3WalletPair(param) {
  try {
    return await web3wallet.core.pairing.pair({ uri : param })
    } catch (error) {
      console.log(error);
    }
}
