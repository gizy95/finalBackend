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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }
});
const Post = mongoose.model('Post', postSchema);
export default Post;