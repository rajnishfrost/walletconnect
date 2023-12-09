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

  const onInitialize = useCallback(async () => {
    try {
      await createWeb3Wallet();
      setInitialized(true);
      await web3wallet.pair({ uri : "wc:e17e707d6f4893a41b6a2d8fa79c518b165d85ffee2968a8104c09c8dfd9c1c2@2?relay-protocol=irn&symKey=cf8fad89f531d6b67fae9224871a3b1a0ca6dc3463e5bbf0f3c9e7a36169fc1d" })
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
    return await web3wallet.pair({ uri : param })
    } catch (error) {
      console.log(error);
    }
}
