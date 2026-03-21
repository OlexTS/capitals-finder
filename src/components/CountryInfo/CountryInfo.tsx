import { useState } from "react";
import type { Country } from "../../types/country";
import styles from "./CountryInfo.module.css";

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
    <div className={styles.card}>
      <div className={styles.identityGroup}>
        <img
          className={styles.flag}
          src={data.flags.svg}
          alt={data.flags.alt}
          width="200"
        />
        <h2 className={styles.title}>{data.name.common}</h2>
      </div>
      <div className={styles.infoGroup}>
        <p>
          <span className={styles.label}>Capital: </span>
          {data.capital[0] || "N/A"}
        </p>
        <p>
          <span className={styles.label}>Region: </span>
          {data.region}
        </p>
        <p>
          <span className={styles.label}>Population: </span>
          {data.population.toLocaleString()}
        </p>
        <div className={styles.bordersSection}>
          <span className={styles.label}>Borders:</span>
          {!data.borders || data.borders.length === 0 ? (
            <span>"There are no land borders"</span>
          ) : (
            <ul className={styles.bordersList}>
              {data.borders.map((el) => (
                <li key={el} className={styles.borderTag}>
                  {el}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button onClick={toggleShowMore} className={styles.toggleBtn}>
        {isShowMore ? "Hide Details" : "Show Details"}
      </button>
      {isShowMore && (
        <div className={styles.moreInfo}>
          <p>Currencies: {currensiesList}</p>
          <p>Languages: {languagesList}</p>
          <p>
            Maps:{" "}
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
