import { Router, Request, Response } from 'express';
import { importedBoard, randomBoard, validateBoard } from './helpers';
const _ = require('lodash');

// Build the API router
const gameRouter = Router();

gameRouter.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  next();
});

gameRouter.get("/randomBoard", (req, res) => {
  res.json(randomBoard());
})

gameRouter.get("/importedBoard", (req, res) => {
  res.json(importedBoard());
})

gameRouter.post("/submitBoard", (req, res) => {
  res.json(validateBoard(req.body));
})

export default gameRouter;