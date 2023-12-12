import { VerifiedWallet } from "@verified-network/verified-sdk";
import React, { useState } from "react";
import { Container } from "../Container";
import { Heading } from "../Heading";
import { Button } from "../Button";
import { useWalletContext } from "../../store/wallet/walletContext";
import PropTypes from 'prop-types';

export const AddWallet = ({handleConnect}) => {
  const { setVerifiedWallet, setEthAddress } = useWalletContext();
  const [imports, setImport] = useState(false);
  const [mnemonics, setMnemonics] = useState("");

  const handleCreateWallet = async () => {
    const wallet = VerifiedWallet.createWallet();
    handleConnect()
    alert(
      `Wallet Created Successfully, Save this Mnemonoics[${
        wallet._mnemonic().phrase
      }]`
    );
    setVerifiedWallet(wallet);
    setEthAddress(wallet.address);
  };

  const handleImportMnemonicsWallet = () => {
    try {
      const wallet = VerifiedWallet.importWallet(mnemonics);
      setVerifiedWallet(wallet);
      setEthAddress(wallet.address);
      alert("Wallet Imported Successfully please press OK")
    } catch (error) {
      alert("invalid mnemonics");
    }
  };

  return (
    <Container>
      <Heading title="Add New Wallet" />
      {imports ? (
        <>
          <input
            onChange={(e) => setMnemonics(e.target.value)}
            type="text"
            style={{
              color: "black",
              padding: "0px 10px",
              width: "100%",
              border: "2px solid grey",
              marginTop: "50px",
              borderRadius: "100px",
            }}
          />
          <button
            onClick={() => handleImportMnemonicsWallet()}
            style={{
              margin: "auto",
              marginTop: "20px",
              display: "block",
              padding: "10px",
              background: "blue",
              width: "100px",
              borderRadius: "100px",
            }}
          >
            Import
          </button>
        </>
      ) : (
        <>
          <div className="flex gap-4 items-center justify-center w-full h-[calc(100%-80px)]">
            <Button
              title="Import Mnemonics Wallet"
              variant="error"
              onClick={() => setImport(true)}
            />
            <Button
              title="Create Wallet"
              variant="warning"
              onClick={handleCreateWallet}
            />
          </div>
        </>
      )}
    </Container>
  );
};

AddWallet.propTypes = {
  handleConnect: PropTypes.func.isRequired,
  uri: PropTypes.string.isRequired,
};