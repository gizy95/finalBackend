import express from 'express';
import { postPost,getAllPosts,deletePost,postEvent,getSinglePost } from '../controllers/postController.js';
import {upload} from '../middlewares/upload.js'


const postRoutes = express.Router();

postRoutes.post("/",upload.single('img'), postPost) //checked
postRoutes.get("/:id", getSinglePost) //checked
postRoutes.get("/", getAllPosts) //checked
postRoutes.delete('/:id', deletePost) //checked
postRoutes.post("/event", postEvent) //checked
postRoutes.delete('/event/:id', deletePost) //checked



export default postRoutes;
