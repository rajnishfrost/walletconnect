import { useInitialization } from './services/walletConnect/web3wallet/walletConnectUtils';
import { AddWallet } from './components/AddWallet';
import { useWalletContext } from './store/wallet/walletContext';
import { ShowWallet } from './components/ShowWallet';

function App() {
  const { verifiedWallet } = useWalletContext();

  useInitialization();

  return (
    <div className='bg-gray-50'>
      {!verifiedWallet ? <AddWallet /> : <ShowWallet />}
    </div>
  );
}

export default App;
