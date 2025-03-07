import e, { Router } from 'express';
import { importedBoard, randomBoard, validateBoard } from './routeHelpers';
import Board from '../interfaces/board';
const _ = require('lodash');

// Build the API router
const gameRouter = Router();

// Handle a request for a random board
gameRouter.get("/randomBoard", (req, res) => {
  res.json(randomBoard());
})

// Handle a request for an imported board
gameRouter.get("/importedBoard", (req, res) => {
  res.json(importedBoard());
})

// Handle a request to submit a board
gameRouter.post("/submitBoard", (req, res) => {

  // Parse the board from the request body
  const parsedBoard: Board = req.body;

  try {
    // Validate the board and return the valid words
    res.json(validateBoard(parsedBoard));
  } catch (e) {
    res.status(400).json({ error: "error processing board" });
  }
})

export default gameRouter;