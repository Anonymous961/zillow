import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Navigation from "./components/Navigation";

function App() {
  const [account, setAccount] = useState(null);
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
        setAccount(accounts[0]);
        console.log("acount is :", accounts[0]);
        // console.log(accounts);
        // const balance = await provider.getBalance(accounts[3]);
        // const balanceInEth = ethers.utils.formatEther(balance);
        // console.log(balanceInEth);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <>
      <Navigation />
      <div>
        <h1>Millow App</h1>
      </div>
    </>
  );
}

export default App;
