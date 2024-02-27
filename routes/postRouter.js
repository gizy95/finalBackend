import express from 'express';
import { postPost,getAllPosts,deletePost,postEvent,getSinglePost,deleteEvent } from '../controllers/postController.js';


const postRoutes = express.Router();

postRoutes.post("/", postPost) //checked
postRoutes.get("/:id", getSinglePost) //checked
postRoutes.get("/", getAllPosts) //checked
postRoutes.delete('/:id', deletePost) //checked
postRoutes.post("/event", postEvent) //checked
postRoutes.delete('/event/:id', deletePost) //checked



export default postRoutes;
