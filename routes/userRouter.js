import express from 'express';
import { registerUser, modifyUser, modifyAvatar, getSingleUser } from '../controllers/userController.js';
import { userCheck } from '../middlewares/userCheck.js'
import { upload } from '../middlewares/upload.js'


const userRoutes = express.Router();

userRoutes.post("/", userCheck, registerUser)
userRoutes.put('/:id', modifyUser);
userRoutes.get('/:id', getSingleUser);
userRoutes.put('/avatar/:id', upload.single('avatar'), modifyAvatar);

export default userRoutes;
