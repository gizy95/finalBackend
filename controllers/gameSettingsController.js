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

        const game = await Game.findById(gameId);
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }



        const userSettingExists = await GameSettings.exists({ user: userId, game: gameId });
        if (userSettingExists) {
            return res.status(400).json({ message: "Settings for this game already exist" });
        }

        const post = await GameSettings.create({
            gamerTag,
            region,
            user: user._id,
            game: game._id
        });

        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}


export const getGameSettings = async (req, res) => {
    try {
        const { userId } = req.params;
        const games = await GameSettings.find({ user: userId }).populate('game');
        res.status(200).json(games);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}


