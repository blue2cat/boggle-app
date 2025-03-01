import React, { useState, useEffect, JSX } from "react";
import Board from "../interfaces/board";
import Letter from "./letter";

interface BoggleMatrixProps {
  setResults: React.Dispatch<React.SetStateAction<string[]>>;
}

// Build the matrix/board component and store state for the board, loading, and errors
function BoggleMatrix({setResults }: BoggleMatrixProps): JSX.Element {

  // Since we're not really dealing with long loading times elsewhere in the app, only display
  // the loading spinner in the matrix/board div
  const [loading, setLoading] = useState(false);
  const [board, setBoard] = useState({ grid: [] } as Board);
  const [error, setError] = useState(false);

  // Request a new board from the server
  useEffect(() => {
    getNewBoard();
  }, []);

  // When a user wants a new board, load one up from the API
  function getNewBoard() {
    try {
      setLoading(true)
      fetch("http://localhost:3001/api/randomBoard")
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
      fetch("http://localhost:3001/api/importedBoard")
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
    setLoading(true);
    fetch("http://localhost:3001/api/submitBoard", {
      method: "POST",
      body: JSON.stringify(board),
    }).then((res) => res.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      });
  }

  function renderTable(): JSX.Element {
    return (
      <div className="table-wrapper">
        <table className="table">
          <tbody>
            {board.grid.map((row, x) => (
              <tr key={x} className="row">
                {row.map((letter, y) => (
                  <td key={y} className="letter">
                    <Letter
                      letter={letter}
                      board={board}
                      setBoard={setBoard}
                      x={x}
                      y={y}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <div className="table-wrapper">
        {loading ? (
          <div>
            Loading
          </div>
        ) : error ? (
          <div>
            Error loading board
          </div>
        ) :
          (
            <table className="table">
              <tbody>
                {renderTable()}
              </tbody>
            </table>
          )
        }
      </div>
      <div className="button-container">
        <button className="button" onClick={getNewBoard}>New Board</button>
        <button className="button" onClick={getServerImportedBoard}>Use Server Board</button>
        <button className="button" onClick={submitBoard}>Submit</button>
      </div>
    </div>
  );
}

export default BoggleMatrix;