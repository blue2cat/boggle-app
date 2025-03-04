interface BoggleResultsProps {
  results: string[];
}

// Display the results of the Boggle game
function BoggleResults({ results }: BoggleResultsProps){
  return (
    <div className="results-container">
      <h2 className="result-header">Results</h2>
      <ul className="results-list">
        {results[0] !== "no results" && results.map((result, i) => (
          <li key={i} className="result-item">{result}</li>
        ))}
      </ul>
      {results[0] === "no results" && <li className="no-results-item">No results found</li>}
    </div>
  );
}

export default BoggleResults;