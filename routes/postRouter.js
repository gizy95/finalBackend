import express from 'express';
import { postPost } from '../controllers/postController.js';


const postRoutes = express.Router();

postRoutes.post("/", postPost)


export default postRoutes;
