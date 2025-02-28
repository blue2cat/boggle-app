import { Router, Request, Response } from 'express';
import Board from '../interfaces/board';
import { randomBoard, zeroedBoard } from './helpers';
const _ = require('lodash');
// Build the API router
const gameRouter = Router();

gameRouter.get("/randomBoard", (req: Request, res: Response) => {
  res.header("Content-Type", "application/json");
  res.json(randomBoard());
})

// GET a 4x4 grid of characters - /submitRoll - verify that the submitted grid is valid and return the list of valid words
gameRouter.post("/submitRoll", (req: Request, res: Response) => {
  const reqBoard: Board = req.body;
  let visited: Board = zeroedBoard();

  
  let validWords: Array<string> = [];



  console.log("Board received: ");
  console.log(reqBoard);



  res.header("Content-Type", "application/json");
  res.json("a");
})

export default gameRouter;