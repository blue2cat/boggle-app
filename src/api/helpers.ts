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

// validate a board and return json object
function validateBoard(reqBoard: Board): Array<string> {

  // Create a visited board to keep track of visited cells we have performed DFS on
  let visited: Board = zeroedBoard();
  let validWords: Array<string> = [];

  // Loop through all the spaces on the board and perform a DFS search on each
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      // Start at the current space on the board and iterate outward in all possible directions
      validWords = validWords.concat(performDFS(reqBoard, visited, x, y, reqBoard.grid[x][y]));
    }
  }
  return validWords;
}

// perform a DFS search on a given position on the board
function performDFS(board: Board, visited: Board, x: number, y: number, subWord: string): Array<string> {
  let validWords: Array<string> = [];

  // Mark that we have performed our search starting at position [i][j]  
  visited.grid[x][y] = "1";

  // Attempt to build an incrementally larger word from all spaces around the current character
  subWord = subWord + board.grid[x][y];

  // Check if the current candidate word is actually a word, if so, add to the valid list
  if (isValidWord(subWord)) {
    validWords = validWords.concat(subWord);
  }

  // Recursively call ourself on each adjacent cell
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i >= 0 && i < 4 && j >= 0 && j < 4 && visited.grid[i][j] == "0") {
        validWords = validWords.concat(performDFS(board, visited, i, j, subWord));
      }
    }
  }

  visited.grid[x][y] = "0";

  return validWords;
}

// return true if the given string is in the dictionary of valid words
function isValidWord(word: string): Boolean {
  console.log("checking" + word);
  return _.includes(global.words, word);
}

// export the functions
export { randomBoard, zeroedBoard, validChars, validateBoard };