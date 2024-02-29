import express from 'express';
import { postGameSettings } from '../controllers/gameSettingsController.js';

const gameSettingsRoutes = express.Router();

gameSettingsRoutes.post("/", postGameSettings) //checked


export default gameSettingsRoutes;