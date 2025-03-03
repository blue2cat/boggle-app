import { Router } from 'express';
import { importedBoard, randomBoard, validateBoard } from './boardHelpers';
import Board from '../interfaces/board';
const _ = require('lodash');

// Build the API router
const gameRouter = Router();

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