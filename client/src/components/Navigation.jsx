import logo from "../../public/assets/react.svg";
const Navigation = ({ account, setAccount }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    console.log("account is :", accounts[0]);

    // console.log(accounts);
    // const balance = await provider.getBalance(accounts[3]);
    // const balanceInEth = ethers.utils.formatEther(balance);
    // console.log(balanceInEth);
  };
  return (
    <nav className="flex w-full justify-around items-center font-light p-2">
      <ul className="flex gap-5 justify-around items-center">
        <li>
          <a href="#">Buy</a>
        </li>
        <li>
          <a href="#">Rent</a>
        </li>
        <li>
          <a href="#">Sell</a>
        </li>
      </ul>
      <div className="flex items-center">
        <img src={logo} alt="Logo" />
        <h1 className="text-indigo-600 font-bold">Millow</h1>
      </div>
      {account ? (
        <button
          type="button"
          className="bg-indigo-600 p-2 w-28 rounded-sm text-white"
        >
          {account.slice(0, 5) + "..." + account.slice(39, 42)}
        </button>
      ) : (
        <button
          type="button"
          className="bg-indigo-600 p-2 w-28 rounded-sm text-white"
          onClick={connectHandler}
        >
          Connect
        </button>
      )}
    </nav>
  );
};

export default Navigation;
