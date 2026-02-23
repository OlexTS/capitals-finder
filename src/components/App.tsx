import SearchCapital from "./SearchCapital/SearchCapital";

const App = () => {
  const handleSearch = (countryName: string) => {
    console.log(`Шукаємо ${countryName}`);
  };
  return (
    <div className="container">
      <h1>Capital Finder</h1>
      <SearchCapital onSearch={handleSearch} />
    </div>
  );
};

export default App;
