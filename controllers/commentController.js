import Comment from '../models/comment.js';
import Post from '../models/post.js';





export const comment = async (req, res) => {
    const { content, userId, postId } = req.body;

    try {
        // Create the comment
        const commentData = await Comment.create({ content, userId, postId });

        // Find the corresponding post and update its comments array
        const post = await Post.findByIdAndUpdate(postId, { $push: { comments: commentData._id } }, { new: true });

        // Send the updated post data in the response
        res.status(201).json({ comment: commentData, post: post });
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
}

