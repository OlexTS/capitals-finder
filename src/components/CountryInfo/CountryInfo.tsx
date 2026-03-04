import type { Country } from "../../types/country";

interface CountryInfoProps {
  data: Country;
}

const CountryInfo = ({ data }: CountryInfoProps) => {
  return (
    <div>
      <img src={data.flags.svg} alt={data.flags.alt} width="200" />
      <h2>{data.name.common}</h2>
      <div>
        <p>Capital: {data.capital[0]}</p>
        <p>Region: {data.region}</p>
        <p>Population: {data.population.toLocaleString()}</p>
        <ul>
          {data.borders.map((el, idx) => (
            <li key={idx}>{el}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CountryInfo;
