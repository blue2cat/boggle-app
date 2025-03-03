import { Router } from 'express';
import { importedBoard, randomBoard, validateBoard } from './boardHelpers';
import Board from '../interfaces/board';
const _ = require('lodash');

// Build the API router
const gameRouter = Router();

// Catch any errors and return a 500 status
gameRouter.use((req, res, err) => {
  console.error(err);
  res.status(500).send('API error');
});

gameRouter.get("/randomBoard", (req, res) => {
  res.json(randomBoard());
})

gameRouter.get("/importedBoard", (req, res) => {
  res.json(importedBoard());
})

gameRouter.post("/submitBoard", (req, res) => {
  // Convert the request body to a JSON object and validate it

  const parsedBoard: Board = req.body;

  res.json(validateBoard(parsedBoard));
})

export default gameRouter;