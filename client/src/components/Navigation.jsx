import logo from "../assets/react.svg";
const Navigation = ({ account, setAccount }) => {
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
      <button
        type="button"
        className="bg-indigo-600 p-2 w-24 rounded-sm text-white"
      >
        0x0...
      </button>
    </nav>
  );
};

export default Navigation;
