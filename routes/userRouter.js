import express from 'express';
import { registerUser, modifyUser, modifyAvatar, getSingleUser, getAllUsers, loginUser, redirecttoDiscord, getCodeandSignUpwithDiscord,followUser,unfollowUser,getFollowedbyUser } from '../controllers/userController.js';
import { userCheck } from '../middlewares/userCheck.js'
import { upload } from '../middlewares/upload.js'
import { authMiddleware } from '../middlewares/userToken.js'


const userRoutes = express.Router();

userRoutes.post("/", userCheck, registerUser)
userRoutes.get('/', getAllUsers)
userRoutes.get("/login", loginUser)
userRoutes.get("/login/discord", redirecttoDiscord)
userRoutes.put('/:id', authMiddleware, modifyUser);
userRoutes.get('/:id', authMiddleware, getSingleUser);
userRoutes.post('/follow/:id',authMiddleware,followUser)
userRoutes.post('/:id/followers',getFollowedbyUser)
userRoutes.post('/unfollow/:id',authMiddleware,authMiddleware,unfollowUser)
userRoutes.put('/avatar/:id', upload.single('avatar'), modifyAvatar);
userRoutes.get("/auth/discord/callback", getCodeandSignUpwithDiscord)

export default userRoutes;
