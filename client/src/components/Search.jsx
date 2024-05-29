const Search = () => {
  return (
    <header className="flex flex-col justify-center items-center min-h-64 bg-city bg-no-repeat bg-cover bg-center">
      <h2 className="text-white font-bold text-2xl">Search it. Explore it. Buy it.</h2>
      <input
        type="text"
        placeholder="Enter an address, neighborhood, city, or ZIP code"
        className="border-2 p-2 w-1/2"
      />
    </header>
  );
};

export default Search;
