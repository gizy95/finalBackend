import express from 'express';
import { registerUser, modifyUser, modifyAvatar, getSingleUser,getMe,getAllUsers,redirecttoDiscord, loginUser, getCodeandSignUpwithDiscord,followandUnfollowUser,likeandUnlikeUser,getFollowers,getFollowings } from '../controllers/userController.js';
import { userCheck } from '../middlewares/userCheck.js'
import { upload } from '../middlewares/upload.js'
import { authMiddleware } from '../middlewares/userToken.js'
import { comment } from '../controllers/commentController.js'



const userRoutes = express.Router();

userRoutes.post("/", userCheck, registerUser)
userRoutes.get('/', getAllUsers)
userRoutes.post("/login", loginUser)
userRoutes.get("/login/discord", redirecttoDiscord)
userRoutes.put('/:id', authMiddleware, modifyUser);
userRoutes.get('/:id', authMiddleware, getSingleUser);
userRoutes.post('/follow/:id',authMiddleware,followandUnfollowUser)
userRoutes.get('/followers:id/',authMiddleware,getFollowers)
userRoutes.get('/followings:id/',authMiddleware,getFollowings)
userRoutes.post('/like/:id',authMiddleware,likeandUnlikeUser)
userRoutes.put('/avatar/:id', upload.single('avatar'), modifyAvatar);
userRoutes.get('/auth/discord/callback', getCodeandSignUpwithDiscord)


userRoutes.post('/comment/:id',authMiddleware,comment)
userRoutes.get ('/me', authMiddleware, getMe)


export default userRoutes;
