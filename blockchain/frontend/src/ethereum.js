import { ethers, Contract } from 'ethers';
import PaymentProcessor from './contracts/PaymentProcessor.json';
import Dai from './contracts/Dai.json';

const getBlockchain = () => // create connection with blockchain
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => { // load=> everything has loaded inside this js script including metamask
      if(window.ethereum) {
        await window.ethereum.enable(); // asks user to grant access to metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signerAddress = await signer.getAddress();

        const paymentProcessor = new Contract(
          PaymentProcessor.networks[window.ethereum.networkVersion].address,
          PaymentProcessor.abi,
          signer
        );

        const dai = new Contract(
          Dai.networks[window.ethereum.networkVersion].address, //for mainnet and public testnet replace by address of already deployed dai token
          Dai.abi,
          signer
        );

        resolve({provider, paymentProcessor, dai});
      }
      resolve({provider: undefined, paymentProcessor: undefined, dai: undefined});
    });
  });

export default getBlockchain;

