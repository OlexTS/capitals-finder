import { useState } from "react";
import SearchCapital from "./SearchCapital/SearchCapital";
import type { Country } from "../types/country";
import { fetchCountryInfo } from "../services/contryService";
import CountryInfo from "./CountryInfo/CountryInfo";

const App = () => {
  const [countryInfo, setCountryInfo] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
 

  const handleSearch = async (countryName: string) => {
    setIsLoading(true);
    setIsError(false);
    setCountryInfo(null);
    try {
      const data = await fetchCountryInfo(countryName);
      if (data) {
        setCountryInfo(data);
      }
      else {
        setIsError(true)
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
      {isLoading && <p>Loading...</p>}
      {isError && <p>Please try again</p>}
      {countryInfo && <CountryInfo data={countryInfo}/>}
    </div>
  );
};

export default App;
