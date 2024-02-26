import express from 'express';
import { postUser } from '../controllers/userController.js';


const userRoutes = express.Router();

userRoutes.post("/", postUser)

export default userRoutes;
