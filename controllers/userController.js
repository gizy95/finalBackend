import User from "../models/user.js";
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {

    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await User.create({ username, email, password: hashedPassword })
        res.status(201).json(data)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}

export const modifyUser = async (req, res) => {
    const { id } = req.params;

    try {
        const { name, surname, birthdate, bio, birthplace, password, username } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        let update = {};

        if (name !== undefined) update.name = name;
        if (surname !== undefined) update.surname = surname;
        if (birthdate !== undefined) update.birthdate = birthdate;
        if (bio !== undefined) update.bio = bio;
        if (birthplace !== undefined) update.birthplace = birthplace;
        if (password !== undefined) update.password = hashedPassword;
        if (username !== undefined) update.username = username;

        const data = await User.findByIdAndUpdate(id, update, { new: true })
        res.status(200).json(data)
    } catch (err) {
        res.sendStatus(500)
    }
}

export const modifyAvatar = async (req, res) => {
    const { id } = req.params;

    let imgBase64 = req.file.buffer.toString('base64');
    try {
        const data = await User.findByIdAndUpdate(id, { avatar: imgBase64 }, { new: true })
        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(data)
    }
    catch (error) {
        res.sendStatus(500)
    }
}

export const getSingleUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);


    } catch (error) {
        res.sendStatus(500);
        console.log(error)
    }
}
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}
