import express from 'express';
import { postUser } from '../controllers/userController.js';
import { userCheck } from '../middlewares/userCheck.js'


const userRoutes = express.Router();

userRoutes.post("/", userCheck, postUser)

export default userRoutes;
