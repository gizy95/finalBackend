import express from 'express';
import { uploadProfile } from '../utils/upload.js';
import { profilePictureUpload , getImagesUploaded } from '../controllers/uploadController.js';

const uploadRouter = express.Router();

uploadRouter.post('/profile-pic', uploadProfile.single('profile_pic'), profilePictureUpload);
uploadRouter.get('/get-pics', getImagesUploaded);
export default uploadRouter;