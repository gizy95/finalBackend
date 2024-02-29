import express from 'express';
import { getMatchData,getChampions } from '../controllers/APIController.js';

const getinfo = express.Router();


getinfo.get("/",getMatchData)
getinfo.get("/champions",getChampions)

export default getinfo;
