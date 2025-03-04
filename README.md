# Boggle Game 
This is a Boggle game that can be played in the browser. The game is built using React and Node.js. The server finds as many words as possible from a given Boggle board.

Both frontend and backend are in the same repository. The frontend is in the `client` directory and the backend is in the `backend` directory. The modules are separated via NPM workspaces. See [App Setup](#app-setup) for more information. 

## Implementation Notes
The backend uses a trie data structure to find words on the Boggle board. The trie is built from a list of words in `wordlist_large.txt` by default if there is no custom word list provided. See [App Features](#app-features) for more information on custom word lists and server boards. 

### Trie
The trie is built from a list of words. Each node in the trie represents a letter in a word. The trie is built by iterating through each word in the list and adding each letter to the trie. The trie is then used to find words on the Boggle board. As the Trie implementation is custom, custom prefix lookups are implemented to find partial words on the board. This feature makes finding only words that we actually have in the trie possible while also not causing exponential time complexity.

### Boggle Board
The Boggle board is a 4x4 grid of letters. The server finds words on the board by iterating through each letter on the board and finding all possible words that start with that letter. The server uses a depth-first search to find words on the board.

## App Setup
As mentioned above, the app uses NPM workspaces to separate the frontend and backend modules. The app can be started by running the following commands:

```bash
npm install
npm run start
```

## App Stats
Given the `words_large.txt` input list, the server responds in an average of ~10ms when queried via Postman with the following request:

```bash
{"grid":[["c","a","t","d"],["c","r","l","z"],["m","g","p","j"],["b","e","a","r"]]}
```

## App Features