import Post from "../models/post.js";
import User from "../models/user.js";
import Game from "../models/game.js";

export const postPost = async (req, res) => {
    try {
        const { content, image, userId, gameId } = req.body;


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
            image,
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