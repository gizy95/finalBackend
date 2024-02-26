import User from "../models/User.js";

export const postUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        const data = await User.create({ name, email, password })
        res.status(201).json(data)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}