import Board from "../interfaces/board";

/** 
 * @description - Validate that a board meets the basic requirements for a Boggle board
 * @param board - The board to validate as Board
 * @returns - True if the board is valid, false otherwise
 */

function validateBoardProps(board: Board): boolean {
  // Make sure the board is valid
  if (!board || !board.grid || board.grid.length !== 4) {
    return false;
  }

  // Check that each row has 4 columns
  for (let i = 0; i < 4; i++) {
    if (board.grid[i].length !== 4) {
      return false;
    }
  }

  return true;
}

export { validateBoardProps };