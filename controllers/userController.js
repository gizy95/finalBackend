import User from "./models/User.js";

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

export const modifyUser = async (req, res) => {
    const { id } = req.params;

    try {
        const { name, surname, birthdate, bio } = req.body;

        let update = {};

        if (name !== undefined) update.name = name;
        if (surname !== undefined) update.surname = surname;
        if (birthdate !== undefined) update.birthdate = birthdate;
        if (bio !== undefined) update.bio = bio;

        const data = await User.findByIdAndUpdate(id, update, { new: true })
        res.status(200).json(data)
    } catch (err) {
        res.sendStatus(500)
    }
}