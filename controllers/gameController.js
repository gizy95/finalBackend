import Games from '../models/game.js';


export const postGame = async (req, res) => {
    try {
        const { name, image } = req.body;
        const data = await Games.create({ name, image })
        if (!data) {
            return res.status(400).json({ message: "Game not created" });
        } else {
            res.status(201).json(data)
        }

    } catch (error) {
        res.sendStatus(500)
    }
}

export const getGames = async (req, res) => {
    try {
        const data = await Games.find()
        res.status(200).json(data)
    } catch (error) {
        res.sendStatus(500)
    }
}

export const getGame = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Games.findById(id)
        if (!data) {
            return res.status(404).json({ message: "Game not found" });
        } else {
            res.status(200).json(data)
        }
    } catch (error) {
        res.sendStatus(500)
    }
}

export const modifyGame = async (req, res) => {
    const { id } = req.params;
    try {
        const { name, image } = req.body;
        let update = {};
        if (name !== undefined) update.name = name;
        if (image !== undefined) update.image = image;
        const data = await Games.findByIdAndUpdate(id, update, { new: true })
        if (!data) {
            return res.status(404).json({ message: "Game not found" });
        } else {
            res.status(200).json(data)
        }
    } catch (error) {
        res.sendStatus(500)
    }
}
export const deleteGame = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Games.findByIdAndDelete(id)
        if (!data) {
            return res.status(404).json({ message: "Game not found" });
        } else {
            res.status(200).json(data)
        }
    } catch (error) {
        res.sendStatus(500)
    }
}
