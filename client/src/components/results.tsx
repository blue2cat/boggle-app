interface BoggleResultsProps {
  results: string[];
}

// Display the results of the Boggle game
function BoggleResults({ results }: BoggleResultsProps){
  return (
    <div className="results-container">
      <h2>Results</h2>
      <ul>
        {results[0] !== "no results" && results.map((result, i) => (
          <li key={i}>{result}</li>
        ))}
      </ul>
    </div>
  );
}

export default BoggleResults;