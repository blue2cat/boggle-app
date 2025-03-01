import express, { Request, Response } from "express";
import gameRoutes from "./api/gameRoutes";
import * as rd from 'readline';
import * as fs from 'fs';


// Define the core app object
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Load the word list and alert the user about any that are too short to 
// comply with game rules
declare global {
  var words: Array<string>;
}

global.words = Array<string>();

try {
  let totalInvalid = 0;

  // Open the word list file
  var reader = rd.createInterface({
    input: fs.createReadStream("words_large.txt")
  });

  // Read in the words
  reader.on("line", (l: string) => {
    global.words.push(l);
    if (l.length < 3) {
      totalInvalid++;
    }
  });

  // Alert the user to any invalid words that don't meet the game rules
  reader.on("close", () => {
    console.log(`Loaded ${global.words.length} words, ${totalInvalid} are invalid. (<3 characters)`);
  });

} catch {
  console.error("Unable to read in the words list, exiting. ");
  process.exit(1);
}

// Integrate the React app
app.use(express.static("../client/build"));

// Define the root route
app.get("/", (req: Request, res: Response) => {
  res.sendFile("../client/build/index.html");
});

// Register the game routes
app.use("/api", gameRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});