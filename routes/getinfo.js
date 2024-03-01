import express from 'express';
import { getUserData,getChampions } from '../controllers/APIController.js';

const getinfo = express.Router();


getinfo.get("/",getUserData)
getinfo.get("/champions",getChampions)

export default getinfo;
