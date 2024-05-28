import { useState, useEffect } from "react";
import { ethers } from "ethers";

function App() {
  const loadBlockchainData = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log(provider);
        const signer = provider.getSigner();

        console.log(signer);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        const balance = await provider.getBalance(accounts[3]);
        const balanceInEth = ethers.utils.formatEther(balance);
        console.log(balanceInEth);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    loadBlockchainData();
  }, []);

  return <div>Millow App</div>;
}

export default App;
