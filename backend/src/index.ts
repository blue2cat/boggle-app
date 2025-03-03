import express, { Request, Response } from "express";
import gameRoutes from "./api/gameRoutes";
import Board from "./interfaces/board"
import Trie from "./api/trie";
import * as rd from 'readline';
import * as fs from 'fs';


// Define the core app object
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Load the word list and alert the user about any that are too short to 
// comply with game rules
declare global {
  var words: Trie;
  var serverBoard: Board;
}

global.words = new Trie();

try {
  let totalInvalid = 0;

  // Open the word list file
  let reader = rd.createInterface({
    input: fs.createReadStream("words_large.txt")
  });

  // Read in the words
  reader.on("line", (word: string) => {
    if (word.length < 3) {
      totalInvalid++;
    }else {
        global.words.insert(word);
    }
  });

} catch {
  console.error("Unable to read in the words list, exiting. ");
  process.exit(1);
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
  res.sendFile("../client/build/index.html");
});

// Register the game routes
app.use("/api", gameRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});