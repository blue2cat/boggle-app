import { useState, useEffect } from "react";
import Board from "../interfaces/board";

function BoggleMatrix() {

  // Since we're not really dealing with long loading times elsewhere in the app, only display
  // the loading spinner in the matrix/board div
  const [loading, setLoading] = useState(false);
  const [board, setBoard] = useState({ grid: [] } as Board);
  const [error, setError] = useState(false);

  //Request a new board from the server
  useEffect(() => {
    getNewBoard();
  }, [])

  // When a user wants a new board, load one up from the API
  function getNewBoard(){
    try {
      // Set the loading state to true to display the spinner
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

  function submitBoard(){
    fetch("http://localhost:3001/api/validateBoard", {
      method: "POST",
      body: JSON.stringify(board),
    });
  }

 
  return (
    <div>
      <div className="table-wrapper">
        {loading ? (
          <div>
            LOADING
          </div>) : (
          <div className="table">
            {error ? (
              <div>
                ERROR
                </div>
            ) : (
              <div className="table-contents">
                {board.grid.map((row, i) => (
                  <div key={i} className="row">
                    {row.map((letter, j) => (
                      <div key={j} className="cell">
                        {letter}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )
                }
            </div>
        )}
      </div>
      <div className="button-container">
        <button className="button" onClick={getNewBoard}>New Board</button>
        <button className="button" onClick={submitBoard}>Submit</button>
      </div>
    </div>
  );
}

export default BoggleMatrix;