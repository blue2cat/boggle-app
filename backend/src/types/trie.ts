/**
 * @file - trie.ts
 * @description - This file defines the Trie data structure and its methods used to 
 * store the dictionary of valid words. This implementation is extended sightly from 
 * basic Trie implementations to include a method to check if a word is a prefix of
 * any word in the trie.
 * @exports - Trie
 */

/**
 * @class TrieNode
 * @description - A node in the Trie data structure. It contains a string for the current char and 
 * a map of children nodes. The isEndOfWord boolean is true if the node is the end of a word.
 * @property {Map<string, TrieNode>} children - The children nodes of the current node
 * @property {boolean} isEndOfWord - True if the node is the end of a word
 * @constructor - Initializes the children map and sets isEndOfWord to false
 */
class TrieNode {
  // Map of children nodes
  children: Map<string, TrieNode>;

  // Is this node the end of a word? We use this to mark the end of a word in the
  // trie to allow for partial word searches
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

/**
 * @class Trie
 * @description - A Trie data structure used to store the dictionary of valid words.
 * @property {TrieNode} root - The root node of the trie
 * @constructor - Initializes the root node of the trie
 * @method insert - Inserts a word into the trie
 * @method search - Searches for a word in the trie
 * @method startsWith - Searches for a prefix in the trie
 * @typedef {Trie}
 */
class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  // Insert a word into the trie
  insert(word: string): void {

    let node = this.root;

    // Iterate through the characters of the word
    for (let i = 0; i < word.length; i++) {

      let letter = word.charAt(i);

      // Get the child node for the current character
      let child = node.children.get(letter);

      if (!child) {
        child = new TrieNode();
        node.children.set(letter, child);
      }

      // Move to the child node and continue
      node = child;
    }

    // We made it to the end of the word, mark the node as the end of a word
    node.isEndOfWord = true;
  }

  // Search for a word in the trie
  search(word: string): boolean {

    let node = this.root;

    // Iterate through the characters of the word
    for (let i = 0; i < word.length; i++) {

      let letter = word.charAt(i);

      // Get the child node for the current character
      let child = node.children.get(letter);

      // If the child node is not found, the word is not in the trie
      if (!child) {
        return false;
      }

      // Move to the child node and continue
      node = child;
    }

    // If we've made it this far and we've marked it as the 
    // end of a word, the word is in the trie
    return node.isEndOfWord;
  }

  // Search for a prefix in the trie
  startsWith(prefix: string): boolean {

    // Start at the root node
    let node = this.root;

    // Iterate through the prefix characters
    for (let i = 0; i < prefix.length; i++) {

      let letter = prefix.charAt(i);

      // Get the child node for the current character
      let child = node.children.get(letter);

      // If the child node is not found, the prefix is not in the trie
      if (!child) {
        return false;
      }

      // Move to the child node and continue
      node = child;
    }

    // If we've made it this far, the prefix is in the trie
    return true;
  }
}

export default Trie;