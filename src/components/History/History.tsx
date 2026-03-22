import styles from "./History.module.css";

interface HistoryProps {
  history: string[];
  onSearch: (counry: string) => void;
}

const History = ({ history, onSearch }: HistoryProps) => {
  return (
    <div className={styles.historyWrapper}>
      {history.length > 0 && (
        <h2 className={styles.historyTitle}>Recent searches:</h2>
      )}

      {history.map((country) => (
        <button
          key={country}
          onClick={() => onSearch(country)}
          className={styles.historyChip}
        >
          {country}
        </button>
      ))}
    </div>
  );
};

export default History;
