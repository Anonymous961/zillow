import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import config from './config.json'
import RealState from './abis/RealEstate.json'
import Escrow from './abis/Escrow.json'
import Card from "./components/Card";
import Home from "./components/Home";

function App() {
  const [provider, setProvider] = useState(null)
  const [escrow, setEscrow] = useState(null);
  const [account, setAccount] = useState(null);
  const [homes, setHomes] = useState([]);
  const [home, setHome] = useState(null);
  const [toggle, setToggle] = useState(false);
  const loadBlockchainData = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider)
        // console.log(provider);
        const network = await provider.getNetwork();
        const realEstate = new ethers.Contract(config[network.chainId].realEstate.address, RealState, provider);
        const totalSupply = await realEstate.totalSupply()
        // const properties = ethers.BigNumber.from(totalSupply).toString();
        // console.log(realEstate)
        // console.log(totalSupply.toString());
        const homes = [];
        for (var i = 0; i < 1; i++) { // replacce by condition  i < totalSupply
          const uri = await realEstate.tokenURI(i);
          const response = await fetch(uri);
          const metadata = await response.json()
          homes.push(metadata)
        }
        setHomes(homes);
        const escrow = new ethers.Contract(config[network.chainId].escrow.address, Escrow, provider);
        setEscrow(escrow)
        // console.log(escrow)
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

  const togglePop = (home) => {
    // console.log(home)
    setHome(home);
    toggle ? setToggle(false) : setToggle(true)
  }

  return (
    <>
      <Navigation account={account} setAccount={setAccount} />
      <Search />
      <div className="flex flex-col items-center p-4">
        <h1 className="text-3xl">Homes For You!</h1>
        <hr />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {homes.map((home, index) => (
            <Card key={index} home={home} toggleProp={togglePop} />
          ))}
        </div>
      </div>
      {toggle && <Home home={home} provider={provider} escrow={escrow} account={account} togglePop={togglePop} setToggle={setToggle} />}
    </>
  );
}

export default App;
