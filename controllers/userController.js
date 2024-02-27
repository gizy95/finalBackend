import User from "../models/user.js";
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {

    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await User.create({ name, email, password: hashedPassword })
        res.status(201).json(data)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}

export const modifyUser = async (req, res) => {
    const { id } = req.params;

    try {
        const { name, surname, birthdate, bio, avatar } = req.body;

        let update = {};

        if (name !== undefined) update.name = name;
        if (surname !== undefined) update.surname = surname;
        if (birthdate !== undefined) update.birthdate = birthdate;
        if (bio !== undefined) update.bio = bio;
        if (avatar !== undefined) update.avatar = avatar;

        const data = await User.findByIdAndUpdate(id, update, { new: true })
        res.status(200).json(data)
    } catch (err) {
        res.sendStatus(500)
    }
}