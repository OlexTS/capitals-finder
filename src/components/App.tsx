import { useState } from "react";
import SearchCapital from "./SearchCapital/SearchCapital";
import type { Country } from "../types/country";
import { fetchCountryInfo } from "../services/contryService";
import CountryInfo from "./CountryInfo/CountryInfo";
import Loader from "./Loader/Loader";

const App = () => {
  const [countryInfo, setCountryInfo] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem("historyCountries");
    return saved ? JSON.parse(saved) : [];
  });

  const addHistory = (name: string) => {
    setHistory((prev) => {
      const updated = [name, ...prev.filter((el) => el !== name)].slice(0, 5);
      localStorage.setItem("historyCountries", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSearch = async (countryName: string) => {
    setIsLoading(true);
    setIsError(false);
    setCountryInfo(null);
    try {
      const data = await fetchCountryInfo(countryName);
      if (data) {
        setCountryInfo(data);
        addHistory(data.name.common);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container">
      <h1>Capital Finder</h1>
      <SearchCapital onSearch={handleSearch} />
      {isError && <p>Please try again</p>}
      {countryInfo && <CountryInfo data={countryInfo} />}
      <div className="history-container">
        {history.length > 0 && <p>Recent searches:</p>}
        <div className="history-list">
          {history.map((country) => (
            <button
              key={country}
              onClick={() => handleSearch(country)}
              className="history-btn"
            >
              {country}
            </button>
          ))}
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default App;
