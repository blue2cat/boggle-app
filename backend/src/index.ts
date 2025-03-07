import express from "express";
import gameRoutes from "./api/gameRoutes";
import Board from "./interfaces/board"
import Trie from "./types/trie";
import * as rd from 'readline';
import * as fs from 'fs';
import { validateBoardProps } from "./helpers/boardHelpers";

// Define the core app object
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

// Define global variables used in the game
declare global {
  var words: Trie;
  var serverBoard: Board;
}

// Initialize the trie we'll use to store the word list
global.words = new Trie();

// Parse args for custom list and board if provided
let wordListPath = process.env.WORDLIST || "words_large.txt";
let boardPath = process.env.BOARD || null;

// Load the word list and alert the user about any that are too short to 
// comply with game rules
try {
  let totalInvalid = 0;
  let totalWords = 0;

  if (!fs.existsSync(wordListPath)) {
    console.error("File not found:", wordListPath);
    process.exit(1);
  }else {
    console.log("Reading in the word list from:", wordListPath);
  }

  // Stream the file in and insert each word into the trie
  const reader = rd.createInterface({
    input: fs.createReadStream(wordListPath)
  });

  reader.on('line', (word: string) => {
    if (word.length < 3) {
      totalInvalid++;
    } else {
      totalWords++;
      global.words.insert(word);
    }
  })
  
  reader.on("close", () => {
    console.log(totalInvalid, "words were too short to be included in the game.");
    console.log(totalWords, "valid words were inserted.");
  });
} catch {
  console.error("Unable to read in the words list, exiting. ");
  process.exit(1);
}

// Load the user-provided board file if it exists
if (boardPath) {
  try {

    if (!fs.existsSync(boardPath)) {
      console.error("File not found:", boardPath);
      process.exit(1);
    }else {
      console.log("Reading in the board from:", boardPath);
    }

    const boardData = fs.readFileSync(boardPath, 'utf8');
    const board: Board = JSON.parse(boardData);

    if (!validateBoardProps(board)) {
      console.error("Invalid board provided, exiting. Please see the README for board requirements.");
      process.exit(1);
    }

    global.serverBoard = board;  
  } catch {
    console.error("Unable to read in the board file, exiting. ");
    process.exit(1);
  }
}

// This is a game, we don't care about CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Integrate the React app
app.use(express.static("../client/build"));

// Define the root route
app.get("/", (req, res) => {
  try {
    res.sendFile("../client/build/index.html");
  } catch {
    res.status(500).send("Unable to load the client app");
  }
});

// Register the game API routes
app.use("/api", gameRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});