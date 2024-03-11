import Post from "../models/post.js";
import User from "../models/user.js";
import Game from "../models/game.js";


export const postPost = async (req, res) => {
    try {
        const { content, userId, gameId } = req.body;

        let imgBase64 = '';

        if (req.file) {
            imgBase64 = req.file.buffer.toString('base64');
        }
        const user = await User.findById(userId, 'name avatar');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const game = await Game.findById(gameId, 'name');
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }

        const post = await Post.create({
            content,
            image: imgBase64,
            user: user._id,
            game: game._id
        });

        post.user = { _id: user._id, name: user.name, avatar: user.avatar };


        post.game = { _id: game._id, name: game.name };

        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export const getSinglePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id).populate('user', 'name avatar').populate('game', 'name');
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);


    } catch (error) {
        res.sendStatus(500);
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('user', 'name avatar')
            .populate({
                path: 'comments',
                populate: {
                    path: 'userId',
                    select: 'name avatar'
                },
                select: 'content created'
            })
            .populate('game', 'name')
            .sort({ created: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
export const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
//do we wanna add a picture in the event part
export const postEvent = async (req, res) => {
    try {
        const { content, userId, gameId, expire, post, type, title, started } = req.body;


        const user = await User.findById(userId, 'name avatar');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const game = await Game.findById(gameId, 'name');
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }

        const event = await Post.create({
            expire,
            content,
            type,
            title,
            started,
            post,
            user: user._id,
            game: game._id
        });

        event.user = { _id: user._id, name: user.name, avatar: user.avatar };


        event.game = { _id: game._id, name: game.name };

        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
        console.log(error);
    }
}

export const getFilteredAllPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const posts = await Post.find({ userId }).populate('user', 'name avatar').populate('game', 'name');
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

