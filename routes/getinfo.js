import express from 'express';
import { getMatchData } from '../controllers/APIController.js';

const getinfo = express.Router();


getinfo.get("/",getMatchData)

export default getinfo;
