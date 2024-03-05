import express from 'express';
import { getUserData, getUserTFTData } from '../controllers/APIController.js';

const getinfo = express.Router();


getinfo.get("/lol", getUserData)
getinfo.get("/tft", getUserTFTData)


export default getinfo;
