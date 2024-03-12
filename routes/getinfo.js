import express from 'express';
import { getUserData, getUserTFTData } from '../controllers/APIController.js';

const getinfo = express.Router();


getinfo.get("/:region/:tag/:key", getUserData)
//getinfo.get("/tft", getUserTFTData)


export default getinfo;
