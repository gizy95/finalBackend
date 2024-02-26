import express from 'express';
import { postUser, modifyUser } from '../controllers/userController.js';
import { userCheck } from '../middlewares/userCheck.js'


const userRoutes = express.Router();

userRoutes.post("/", userCheck, postUser)
userRouter.put('/:id', modifyUser);

export default userRoutes;
