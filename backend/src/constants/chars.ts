/**
 * @description - Returns an array of valid characters for the board. When generating a random 
 * board, the characters will be selected from this array. Note that as per the rules of Boggle,
 * only lowercase letters are allowed.
 * @returns - An array of valid characters for the board
 */

export default function validChars(): string[] {
  return ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
}