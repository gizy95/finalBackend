import express from 'express';
<<<<<<< HEAD
import { postPost, getAllPosts, deletePost, postEvent, getSinglePost } from '../controllers/postController.js';
import { upload } from '../middlewares/upload.js'
=======
import { postPost,getAllPosts, getFilteredAllPosts, deletePost,postEvent,getSinglePost } from '../controllers/postController.js';
import {upload} from '../middlewares/upload.js'
import {authMiddleware} from '../middlewares/userToken.js'
>>>>>>> main


const postRoutes = express.Router();

postRoutes.post("/", upload.single('picture'), postPost) //checked
postRoutes.get("/:id", getSinglePost) //checked
postRoutes.get("/", getAllPosts) //checked
postRoutes.get('/:id/all',authMiddleware,getFilteredAllPosts)
postRoutes.delete('/:id', deletePost) //checked
postRoutes.post("/event", postEvent) //checked
postRoutes.delete('/event/:id', deletePost) //checked



export default postRoutes;
