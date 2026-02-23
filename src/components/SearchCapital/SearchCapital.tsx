import { useState } from "react";

interface SearchCapitalProps {
  onSearch: (country: string) => void;
}

const SearchCapital = ({ onSearch }: SearchCapitalProps) => {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Please enter a country name..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchCapital;
