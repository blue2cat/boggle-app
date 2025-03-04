import { importedBoard, randomBoard, validateBoard } from '../../../src/api/boardHelpers';
import Trie from '../../../src/api/trie';

describe('boardHelpers', () => {
  // Define the global board object used to test importedBoard
  const serverBoard = {
    grid: [
      ['c', 'a', 't', 'd'],
      ['e', 'f', 'g', 'h'],
      ['i', 'j', 'k', 'l'],
      ['m', 'n', 'o', 'p']
    ]
  };

  global.words = new Trie();

  it('randomBoard should generate a 4x4 board', () => {
    const board = randomBoard();
    expect(board.grid.length).toBe(4);
    expect(board.grid[0].length).toBe(4);
  });

  it('importedBoard should generate a 4x4 board if no global board exists', () => {
    const board = importedBoard();
    expect(board.grid.length).toBe(4);
    expect(board.grid[0].length).toBe(4);
  });

  global.serverBoard = serverBoard;

  it('importedBoard should return the global board if it exists', () => {
    const board = importedBoard();
    expect(board).toEqual(serverBoard);
  });

  // Test data for the validateBoard function
  const words = ["cat", "dog", "rat", "bat", "hat", "tab"]

  // Load a few test words into the trie
  words.forEach(word => {
    global.words.insert(word);
  });

  const board = {
    grid: [
      ['c', 'a', 't', 'b'],
      ['r', 'f', 't', 'a'],
      ['i', 'j', 'g', 't'],
      ['m', 'd', 'o', 'p']
    ]
  };

  it('validateBoard should detect a valid horizontal word', () => {
    const words = validateBoard(board);
    expect(words).toContain('cat');
  });

  it('validateBoard should detect a valid vertical word', () => {
    const words = validateBoard(board);
    expect(words).toContain('bat');
  });

  it('validateBoard should detect a word on multiple diagonals', () => {
    const words = validateBoard(board);
    expect(words).toContain('rat');
  });

  it('validateBoard should detect a word on a right-angle', () => {
    const words = validateBoard(board);
    expect(words).toContain('dog');
  });

  it('validateBoard should not detect a word that is not on the board', () => {
    const words = validateBoard(board);
    expect(words).not.toContain('hat');
  });

  it('validateBoard should not detect a word that is not in the dictionary', () => {
    const words = validateBoard(board);
    expect(words).not.toContain('bird');
  });

  it('validateBoard should detect words that read backwards', () => {
    const words = validateBoard(board);
    expect(words).toContain('tab');
  });
});