import express from 'express';
import { postGame, modifyGame,getGames, getGame, deleteGame } from '../controllers/gameController.js';

const gameRoutes = express.Router();

gameRoutes.post("/", postGame) //checked
gameRoutes.get("/", getGames) // checked
gameRoutes.get("/:id", getGame) // checked
gameRoutes.put('/:id', modifyGame); // checked
gameRoutes.delete('/:id', deleteGame) // checked

export default gameRoutes;