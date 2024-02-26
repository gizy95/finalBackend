import express from 'express';
import { postGame, modifyGame,getGames, getGame, deleteGame } from '../controllers/gameController.js';

const gameRoutes = express.Router();

gameRoutes.post("/", postGame)
gameRoutes.get("/", getGames)
gameRoutes.get("/:id", getGame)
gameRoutes.put('/:id', modifyGame);
gameRoutes.delete('/:id', deleteGame)

export default gameRoutes;