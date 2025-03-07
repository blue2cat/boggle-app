# Boggle Game 
This is a Boggle game that can be played in the browser. The game is built using React and Node.js. The server finds as many words as possible from a given Boggle board.

Both the frontend and backend are in the same repository. See [App Setup](#app-setup) for more information. 

## App Setup
The app uses NPM workspaces to separate the frontend and backend modules. To run the app, execute the following commands from the root of the repo:

```bash
npm install
```

### Running the App
To start the app, run the following command from the root of the repo:

```bash
npm start
```
This will build the client and start the server. The UI will be available at http://localhost:4000 by default.

### Providing a Custom Word List
To use a custom word list, add an environment variable `WORDLIST` with the path to the custom word list. For example on Windows:

```bash
$env:WORDLIST = "words_large.txt"
npm start 
```
The format of the custom word list should be one word per line formatted as a regular text file. See `backend/words_large.txt` for example formatting.

### Providing a Custom Boggle Board

The Boggle board is a 4x4 grid of letters. The default Boggle board is randomly generated. You can edit it by clicking on the letters in the UI. Alternatively, you can use a custom Boggle board by providing a JSON object with a 4x4 grid of letters. To use a custom Boggle board provided to the server, add an environment variable `BOARD` with the path to the custom Boggle board. For example on Windows:

```bash
$env:BOARD = "board.json"
npm start
```

The format of the custom Boggle board should be a JSON object with a `grid` key that contains a 4x4 array of letters. For example:

```json
{
  "grid": [
    ["c", "a", "t", "d"],
    ["c", "r", "l", "z"],
    ["m", "g", "p", "j"],
    ["b", "e", "a", "r"]
  ]
}
```

Notes that these environment variables can be combined to use both a custom word list and a custom Boggle board.

### Development
To run the app in development mode, run the following command from the root of the repository:

```bash
npm run dev
```
This will start the server and client on separate ports. The server will run on port 4000 and the client will run on port 3000. The client development server will proxy API requests to the backend server.

### Testing
To run the tests for the app, run the following command from the root of the repository:

```bash
npm test
```

## Implementation Notes
The backend uses a trie data structure to find words on the Boggle board. The trie is built from a list of words in `wordlist_large.txt` by default if there is no custom word list provided. See [Running the App](#running-the-app) for more information on using a custom word list.

### Trie
The trie is built from a list of words. Each node in the trie represents a letter in a word or series of words. As the Trie implementation is custom, prefix lookups are implemented to find partial words on the board. This feature makes finding only words that we actually have in the trie possible while also not causing exponential time complexity.

### App Stats
Given the `words_large.txt` (370105 lines) input file, the server responds in an average of ~10ms when queried via Postman with the following POST request body:

```bash
{"grid":[["c","a","t","d"],["c","r","l","z"],["m","g","p","j"],["b","e","a","r"]]}
```
