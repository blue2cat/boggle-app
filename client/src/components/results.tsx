interface BoggleResultsProps {
  results: string[];
}

// Display the results of the Boggle game
function BoggleResults({ results }: BoggleResultsProps){
  return (
    <div className="results">
      <h2>Results</h2>
      <ul>
        {results.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
}

export default BoggleResults;