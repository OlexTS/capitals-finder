import { useState } from "react";
import styles from "./SearchCapital.module.css";

interface SearchCapitalProps {
  onSearch: (country: string) => void;
}

const SearchCapital = ({ onSearch }: SearchCapitalProps) => {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
    setInputValue("");
  };
  return (
    <form className={styles.searchWrapper} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        {" "}
        <input
          className={styles.searchInput}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="words"
          type="text"
          placeholder="Please enter a country name..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className={styles.searchBtn}
          type="submit"
          disabled={!inputValue.trim()}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchCapital;
