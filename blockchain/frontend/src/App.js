import React, { useState, useEffect } from 'react';
import Store from './Store.js';
import getBlockchain from './ethereum.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [paymentProcessor, setPaymentProcessor] = useState(undefined); 
  const [dai, setDai] = useState(undefined); 

  useEffect(() => {
    const init = async () => {
      const { paymentProcessor, dai } = await getBlockchain();
      setPaymentProcessor(paymentProcessor);
      setDai(dai);
    }
    init();
  }, []);
  // if metamask is not installed
  if(typeof window.ethereum === 'undefined') {
    return (
      <div className='container'>
        <div className='col-sm-1'>
          <h1>ERC20 Tokens Ecommerce App</h1>
          <p>You need to install the latest version of Metamask to use this app. MEtamask is an Ethereum wallet, available as a Google chrome extension.</p>
          <ul>
            <li>Go to the <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>Metamask page</a> on the chrome webstore and install it</li>  
            <li>If you already have it installed, uninstall and re-install it</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='col-sm-12'>
        <h1>ERC20 Tokens</h1>
        <Store paymentProcessor={paymentProcessor} dai={dai} />
      </div>
    </div>
  );
}

export default App;