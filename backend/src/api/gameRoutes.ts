import { Router, Request, Response } from 'express';
import { randomBoard, validateBoard, zeroedBoard } from './helpers';
const _ = require('lodash');

// Build the API router
const gameRouter = Router();

gameRouter.get("/randomBoard", (req: Request, res: Response) => {
  res.header("Content-Type", "application/json");
  res.json(randomBoard());
})

// GET a 4x4 grid of characters - /submitRoll - verify that the submitted grid is valid and return the list of valid words
gameRouter.post("/submitRoll", (req: Request, res: Response) => {
  res.header("Content-Type", "application/json");
  res.json(validateBoard(req.body));
})

export default gameRouter;