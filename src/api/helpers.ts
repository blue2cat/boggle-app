import Board from "../interfaces/board";
const _ = require('lodash');

// Return the valid characters for the board
function validChars(): string[] {
  return ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
}

// Restrict the matrix to only contain characters from A to Z
function randomBoard(): Board {
  let newBoard: Board = {
    grid: Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => _.sample(validChars()))
    )
  };
  return newBoard;
}

// zeroed 4x4 board
function zeroedBoard(): Board {
  let newBoard: Board = {
    grid: Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => "0")
    )
  };
  return newBoard;
}

// export the functions
export { randomBoard, zeroedBoard, validChars };