import { useState } from "react";
import SearchCapital from "./SearchCapital/SearchCapital";
import type { Country } from "../types/country";
import { fetchCountryInfo } from "../services/contryService";
import CountryInfo from "./CountryInfo/CountryInfo";
import Loader from "./Loader/Loader";
import styles from "./App.module.css";
import History from "./History/History";

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
    <div className={styles.appWrapper}>
      <h1 className={styles.mainTitle}>Capital Finder</h1>
      <SearchCapital onSearch={handleSearch} />
      <History history={history} onSearch={handleSearch}/>
      <main>
        {isError && <p>Please try again</p>}
        {countryInfo && <CountryInfo data={countryInfo} />}
        {isLoading && <Loader />}
      </main>
    </div>
  );
};

export default App;
