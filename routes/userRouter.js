import express from 'express';
import { registerUser, modifyUser } from '../controllers/userController.js';
import { userCheck } from '../middlewares/userCheck.js'


const userRoutes = express.Router();

userRoutes.post("/", userCheck, registerUser)
userRoutes.put('/:id', modifyUser);

export default userRoutes;
