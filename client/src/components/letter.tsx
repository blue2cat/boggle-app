import React, { useState } from 'react';
import Board from '../interfaces/board';

interface LetterProps {
  letter: string;
  board: Board;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
  x: number;
  y: number;
}

function Letter({ letter, board, setBoard, x, y }: LetterProps) {

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(letter);

  // Handle the change event to update the view when the user
  // types in the input field
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  // Handle the blur event to stop editing and change the value
  // on the board
  function handleBlur() {
    setEditing(false);
    const newBoard = { ...board };
    newBoard.grid[x][y] = value;
    setBoard(newBoard);
  }

  return (
    <div className="letter">
      {editing ? (
        <input
          type="text"
          className='input-text'
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div onClick={() => setEditing(true)}>{value}</div>
      )}
    </div>
  );
}

export default Letter;