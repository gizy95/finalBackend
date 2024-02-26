import Post from "../models/post.js";

export const postPost = async (req, res) => {

    try {
        const { content, image } = req.body;
        const data = await Post.create({ content, image })
        res.status(201).json(data)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}