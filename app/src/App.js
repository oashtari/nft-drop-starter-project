import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if(solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');

          const response = await solana.connect({ onlyIfTrusted: true});
          console.log("Connected with Public Key", response.publicKey.toString());

          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const {solana} = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button 
    className="cta-button connect-wallet-button"
    onClick={connectWallet}
    >Connect to Wallet
    </button>
  );
  

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">Get your 🐕 NFTs here!</p>
          <p className="sub-text">🐕  NFT drop machine with fair mint</p>

          <p className="instructions">Hi, if you're new to web3/blockchain/crypto/NFTs, please do the following:</p>
          <p className="instructions">1. Go here and downlown the <a href="https://phantom.app/download">Phantom browser extension</a>, you'll need this to *mint* your new Gunner NFT.</p>
          <p className="instructions">If you're curious about Phantom, have a look here: <a href="https://phantom.app">Phantom</a></p>
          <p className="instructions">Phantom is a wallet for the <a href="https://solana.com/">Solana blockchain.</a>, it is needed so you can use SOL to mint the NFT.</p>
          <p className="instructions">We will be using the Solana devnet, so you don't need actual money for this minting.</p>
          <br></br>


          <p className="instructions">2. <a href="https://help.phantom.app/hc/en-us/articles/4406388623251-How-to-create-a-new-wallet">Create new wallet and save seed phrase.</a></p>
          <p className="instructions">3. <a href="https://help.phantom.app/hc/en-us/articles/4406393831187-How-to-deposit-SOL">Fund your account with SOL.</a></p>
          
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
