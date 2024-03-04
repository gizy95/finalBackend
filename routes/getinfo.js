import express from 'express';
import { getUserLOLData } from '../controllers/APIController.js';

const getinfo = express.Router();


getinfo.get("/",getUserLOLData)


export default getinfo;
