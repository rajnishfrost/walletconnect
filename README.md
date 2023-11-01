# WalletConnect demo

This project offers you the ability to create a new wallet or import a mnemonics wallet from `verified-network-sdk` with WalletConnect integration. 

## Tech Stack

1. `React.Js`(18.2.0)
2. `@verified-network/verified-sdk`(1.0.6)
3. `@walletconnect/web3wallet`(1.7.3)
4. `eslint`
5. `tailwind`

## Requirement to run an application on local

1. You must have installed Node Package Manager (NPM) on your machine
2. Create a `.env` file in the root directory of an application
3. Copy content from `.env.example` file and paste it into `.env` file
4. Assign `WalletConnect` ProjectId in `REACT_APP_WALLET_CONNECT_PROJECT_ID` env variable in `.env` file

## Steps to start an application on local

1. Move into the root directory of an application
2. Run `npm install`
3. Run `npm start`. This will run an application on a local server. You can open this by opening or clicking [http://localhost:3000/](http://localhost:3000/) in your browser

## Features we added

1. The user can create a new wallet or import a mnemonics wallet using `verified-network-sdk`
2. The user can pair a created or imported wallet with `WalletConnect` [Dapp](https://react-app.walletconnect.com/)
3. The user can get a sign request from `Dapp`
4. The user can see paired wallet lists
5. The user can see the signed session lists
6. The user can delete paired wallet from the pair list
7. The user can disconnect signed session from the session list

## Limitations

1. Currently, we need to create a wallet every time after refreshing the page in the browser.
2. Not storing wallet information in local storage or any other storage for future use.
3. Currently, we only have a way to pair `Dapps` using `WC URI`.
4. I can't test `Send Transaction` request as it shows
   `Insufficient funds for intrinsic transaction cost`

## Features we can add

1. Persist wallet data
2. Add functionality to use a previously created wallet along with creating a new wallet
3. Add a QR code scanner to pair with `Dapps`
