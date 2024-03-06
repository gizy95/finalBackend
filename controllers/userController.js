import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

//const secretToken = crypto.randomBytes(32).toString('hex');

const secretToken = process.env.SECRET_TOKEN;

const generateToken = (data) => {
    return jwt.sign(data, secretToken, { expiresIn: '1800s' })
}

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

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(404).send('User does not exist')
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return res.status(400).send('Invalid credentials');
        }

        const token = generateToken({ email: user.email, id: user._id })

        res.json({ token, user });

    } catch (err) {
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
