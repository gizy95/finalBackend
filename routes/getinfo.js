import express from 'express';
import { getUserLOLData,getUserTFTData } from '../controllers/APIController.js';

const getinfo = express.Router();


getinfo.get("/lol",getUserLOLData)
getinfo.get("/tft",getUserTFTData)


export default getinfo;
