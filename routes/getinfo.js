import express from 'express';
import { getUserData } from '../controllers/APIController.js';

const getinfo = express.Router();


getinfo.get("/", getUserData)

export default getinfo;
