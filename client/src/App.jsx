import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import config from './config.json'
import RealState from './abis/RealEstate.json'
import Escrow from './abis/Escrow.json'
import Card from "./components/Card";

function App() {
  const [provider, setProvider] = useState(null)
  const [escrow, setEscrow] = useState(null);
  const [account, setAccount] = useState(null);
  const loadBlockchainData = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider)
        console.log(provider);
        const network = await provider.getNetwork();
        const realEstate = new ethers.Contract(config[network.chainId].realEstate.address, RealState, provider);
        const totalSupply = await realEstate.totalSupply()
        console.log(totalSupply.toString());

        const escrow = new ethers.Contract(config[network.chainId].escrow.address, Escrow, provider);
        setEscrow(escrow)
        // console.log(config[network.chainId].realEstate.address, config[network.chainId].escrow.address)
        window.ethereum.on("accountsChanged", async () => {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const account = ethers.utils.getAddress(accounts[0]);
          setAccount(account);
        });
        // console.log(account);
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
      <Navigation account={account} setAccount={setAccount} />
      <Search />
      <div className="p-4">
        <h1 className="text-3xl">Homes for you!</h1>
        <hr />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
}

export default App;
