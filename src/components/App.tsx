import { useState } from "react";
import SearchCapital from "./SearchCapital/SearchCapital";
import type { Country } from "../types/country";
import { fetchCountryInfo } from "../services/contryService";

const App = () => {
  const [countryInfo, setCountryInfo] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  console.log(countryInfo);
  console.log(isLoading);
  console.log(isError);

  const handleSearch = async (countryName: string) => {
    setIsLoading(true);
    setIsError(false);
    setCountryInfo(null);
    try {
      const data = await fetchCountryInfo(countryName);
      if (data) {
        setCountryInfo(data);
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
    </div>
  );
};

export default App;
