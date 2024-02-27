import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    post: {
        type: Boolean,
        default: true
    },
    title: {
        type: String
    },
    title: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    expired: {
        type: Date,
    },
    likes: {
        type: Array
    },
    comments: {
        type: Array
    },
    type: {
        type: String,
        enum: ['Solo Player', 'Team Player'],
        default: 'Solo Player'
    },
    title: {
        type: String
    },
    started: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    },
    
    
    
    
});

const Post = mongoose.model('Post', postSchema);
export default Post;