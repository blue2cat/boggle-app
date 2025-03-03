import Board from "../interfaces/board";
import validChars from "../constants/chars";
const _ = require('lodash');

// Restrict the matrix to only contain characters from A to Z
function randomBoard(): Board {
  let newBoard: Board = {
    grid: Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => _.sample(validChars()))
    )
  };
  return newBoard;
}

//  @
//  @returns {Board} - the board
function importedBoard(): Board {
  // If we don't have a board, generate one and set as the global board
  if (global.serverBoard == null) {
    global.serverBoard = randomBoard();
  }

  return global.serverBoard;
}

// validate a board and return json object
function validateBoard(reqBoard: Board): Array<string> {
  // make sure the board is valid
  if (!reqBoard || !reqBoard.grid || reqBoard.grid.length !== 4) {
    return [];
  }

  // Create a visited board of boolean values with all cells set to false
  let visited: boolean[][] = Array.from({ length: 4 }, () =>
    Array.from({ length: 4 }, () => false)
  );

  let validWords: Set<string> = new Set<string>();

  // Perform DFS on every cell in the board
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      dfs(reqBoard, visited, i, j, "", validWords);
    }
  }

  // Convert the set to an array and return it
  return Array.from(validWords);
}

// Check if the word is a valid word
function isWord(word: string): boolean {
  return global.words.search(word);
}

// Check if the word is a prefix of any word in the trie
function isPrefix(word: string): boolean {
  return global.words.startsWith(word);
}


function dfs(board: Board, visited: boolean[][], i: number, j: number, word: string, validWords: Set<string>) {
  // If we are out of bounds, return
  if (i < 0 || j < 0 || i >= 4 || j >= 4) {
    return;
  }

  // If we have already visited this cell, return
  if (visited[i][j]) {
    return;
  }

  // Mark the cell as visited
  visited[i][j] = true;

  // Append the character to the word
  word += board.grid[i][j];

  if (!isPrefix(word)) {
    visited[i][j] = false; // Ensure backtracking before returning
    return;
  }
  

  // If the word is in the trie, add it to the set
  if (isWord(word)) {
    validWords.add(word);
  }

  // Recursively call DFS on all neighbors where we're not out of bounds
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (x !== 0 || y !== 0) {
        dfs(board, [...visited.map(row => [...row])], i + x, j + y, word, validWords);

      }
    }
  }

  // Unmark the cell as visited
  visited[i][j] = false;
}



// export the functions
export { randomBoard, validChars, validateBoard, importedBoard };