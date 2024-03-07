import express from 'express';
import { registerUser, modifyUser, modifyAvatar, getSingleUser, getAllUsers, loginUser, loginwithDiscord, getCode } from '../controllers/userController.js';
import { userCheck } from '../middlewares/userCheck.js'
import { upload } from '../middlewares/upload.js'
import { authMiddleware } from '../middlewares/userToken.js'


const userRoutes = express.Router();

userRoutes.post("/", userCheck, registerUser)
userRoutes.post("/login", loginUser)
userRoutes.put('/:id', authMiddleware, modifyUser);
userRoutes.get('/user', authMiddleware, getSingleUser);
userRoutes.get("/login/discord", loginwithDiscord)
userRoutes.get("/auth/discord/callback", getCode)
userRoutes.put('/avatar/:id', upload.single('avatar'), modifyAvatar);
userRoutes.get('/', getAllUsers)

export default userRoutes;
