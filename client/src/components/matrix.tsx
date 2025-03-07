import { useState, useEffect, JSX } from "react";
import Board from "../interfaces/board";
import Letter from "./letter";

// Build the matrix/board component and store state for the board, loading, and errors
function BoggleMatrix(): JSX.Element {

  // Since we're not really dealing with long loading times elsewhere in the app, only display
  // the loading spinner in the matrix/board div
  const [loading, setLoading] = useState(false);
  const [board, setBoard] = useState({ grid: [] } as Board);
  const [error, setError] = useState(false);
  const [results, setResults] = useState<Array<string>>(["no results"]);

  // Request a new board from the server
  useEffect(() => {
    getNewBoard();
  }, []);

  // When a user wants a new board, load one up from the API
  function getNewBoard() {
    try {
      setLoading(true)
      fetch("/api/randomBoard")
        .then((res) => res.json())
        .then((data) => {
          setBoard(data);
          setLoading(false);
        });
    } catch {
      setError(true);
    }
  }

  // When a user requests the server imported board, get it from the API
  function getServerImportedBoard() {
    try {
      setLoading(true)
      fetch("/api/importedBoard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setBoard(data);
          setLoading(false);
        });
    } catch {
      setError(true);
    }
  }

  function submitBoard() {
    try {
      fetch("/api/submitBoard", {
        method: "POST",
        body: JSON.stringify(board),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json())
        .then((data) => {
          setResults(data);
        });
    } catch {
      setError(true);
    }
  }

  return (
    <div>
      <div className="button-container">
        <button className="button" onClick={getNewBoard}>new board</button>
        <button className="button" onClick={getServerImportedBoard}>use server board</button>
        <button className="button" onClick={submitBoard}>submit</button>
      </div>
      <div className="matrix">

        <div className="table-container">
          {loading ? (
            null
          ) : error ? (
            <div>
              Error loading board
            </div>
          ) :
            (
              <div className="table-wrapper">
                <table className="table">
                  <tbody>
                    {board.grid.map((row, x) => (
                      <tr key={x} className="row">
                        {row.map((letter, y) => (
                          <Letter
                            letter={letter}
                            board={board}
                            setBoard={setBoard}
                            x={x}
                            y={y}
                            key={y}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        </div>
      </div>
      <div className="results-container">
        <h2 className="result-header">results</h2>
        <div className="results-list">
          {results[0] !== "no results" && results.map((result, i) => (
            <div key={i} className="result-item">{result}</div>
          ))}
        </div>
        {results[0] === "no results" && <li className="no-results-item">No results found</li>}
      </div>
    </div>
  );
}


export default BoggleMatrix;