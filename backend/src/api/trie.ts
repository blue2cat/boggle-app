// Trie with boggle 
// Trie Node
class TrieNode {
  // Map of children nodes
  children: Map<string, TrieNode>;

  // Is this node the end of a word?
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

// Trie
class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  // Insert a word into the trie
  insert(word: string): void {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      let letter = word.charAt(i);
      let child = node.children.get(letter);
      if (!child) {
        child = new TrieNode();
        node.children.set(letter, child);
      }
      node = child;
    }
    node.isEndOfWord = true;
  }

  // Search for a word in the trie
  search(word: string): boolean {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      let letter = word.charAt(i);
      let child = node.children.get(letter);
      if (!child) {
        return false;
      }
      node = child;
    }
    return node.isEndOfWord;
  }

  // Search for a prefix in the trie
  startsWith(prefix: string): boolean {
    let node = this.root;
    for (let i = 0; i < prefix.length; i++) {
      let letter = prefix.charAt(i);
      let child = node.children.get(letter);
      if (!child) {
        return false;
      }
      node = child;
    }
    return true;
  }
}

export default Trie;