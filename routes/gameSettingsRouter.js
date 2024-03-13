import express from 'express';
import { postGameSettings, getGameSettings } from '../controllers/gameSettingsController.js';

const gameSettingsRoutes = express.Router();

gameSettingsRoutes.post("/", postGameSettings) //checked
gameSettingsRoutes.get("/:userId", getGameSettings) //checked



export default gameSettingsRoutes;