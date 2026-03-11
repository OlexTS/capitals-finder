import { useState } from "react";
import type { Country } from "../../types/country";

interface CountryInfoProps {
  data: Country;
}

const CountryInfo = ({ data }: CountryInfoProps) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const languagesList = data.languages
    ? Object.values(data.languages).join(", ")
    : "No data languages";
  const currensiesList = data.currencies
    ? Object.values(data.currencies)
        .map((el) => `${el.name} ${el.symbol}`)
        .join(", ")
    : "No data currencies";

  const toggleShowMore = () => {
    setIsShowMore((prev) => !prev);
  };
  return (
    <div>
      <img src={data.flags.svg} alt={data.flags.alt} width="200" />
      <h2>{data.name.common}</h2>
      <div>
        <p>Capital: {data.capital[0] || "N/A"}</p>
        <p>Region: {data.region}</p>
        <p>Population: {data.population.toLocaleString()}</p>
        <div>
          Borders:
          {!data.borders || data.borders.length === 0 ? (
            <span>"There are no land borders"</span>
          ) : (
            <ul>
              {data.borders.map((el) => (
                <li key={el}>{el}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button onClick={toggleShowMore}>
        {isShowMore ? "Hide Details" : "Show Details"}
      </button>
      {isShowMore && (
        <div>
          <p>Currencies: {currensiesList}</p>
          <p>Languages: {languagesList}</p>
          <p>
            Maps: {' '}
            <a
              href={data.maps.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Google Maps
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default CountryInfo;
