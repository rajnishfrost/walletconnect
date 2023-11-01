import { createContext, useContext } from 'react';

export const WalletContext = createContext({
  verifiedWallet: null,
  ethAddress: '',
  setVerifiedWallet: () => {},
  setEthAddress: () => {},
});

export const useWalletContext = () => {
  return useContext(WalletContext);
};
