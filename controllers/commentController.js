import Comment from '../models/comment.js';




export const comment = async (req, res) => {

    const { content } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;

    try {
        
        const commentData = await Comment.create({ content, userId, postId })
        res.status(201).json(commentData)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}