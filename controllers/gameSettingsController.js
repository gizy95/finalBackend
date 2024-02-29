import User from "../models/user.js";
import Game from "../models/game.js";
import GameSettings from "../models/gameSettings.js";

export const postGameSettings = async (req, res) => {
    try {
        const { gamerTag, region, userId, gameId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const game = await Game.findById(gameId, 'API');
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }

        const { API } = game;
        const url = `${API.trim()}${gamerTag}`

        const userSettingExists = await GameSettings.exists({ user: userId, game: gameId });
        if (userSettingExists) {
            return res.status(400).json({ message: "Settings for this game already exist" });
        }

        const post = await GameSettings.create({
            gamerTag,
            region,
            APIUrl: url,
            user: user._id,
            game: game._id
        });

        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}


