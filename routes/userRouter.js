import express from 'express';
import { registerUser, modifyUser, modifyAvatar, getSingleUser, getAllUsers, loginUser } from '../controllers/userController.js';
import { userCheck } from '../middlewares/userCheck.js'
import { upload } from '../middlewares/upload.js'


const userRoutes = express.Router();

userRoutes.post("/", userCheck, registerUser)
userRoutes.post("/login", loginUser)
userRoutes.put('/:id', modifyUser);
userRoutes.get('/:id', getSingleUser);
userRoutes.put('/avatar/:id', upload.single('avatar'), modifyAvatar);
userRoutes.get('/', getAllUsers)

export default userRoutes;
