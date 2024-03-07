import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from "axios";
// import crypto from 'crypto';

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

export const loginwithDiscord = async (req, res) => {
        const Url = "https://discord.com/oauth2/authorize?client_id=1214873733408358450&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fuser%2Fauth%2Fdiscord%2Fcallback&scope=email+identify"
        res.redirect(Url)
    
}
export const getCode = async (req, res) => {
    if (!req.query.code) {
        return res.status(400).json({ message: "Code not found" })
    }
    const code = req.query.code;
     
    const params = new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI,
        scope: "identify"
    });
    
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/x-www-form-urlencoded'
    };
   
    
    const response = await axios.post('https://discord.com/api/oauth2/token',params, {
        headers: headers
        })
        if (!response.status === 200) {
            return res.status(400).json({ message: "Failed to get token" })
            
        }
        // console.log("______First ROUND!!! ----------->", response.data)
        // res.status(200).json(response.data)

        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                
                Authorization: `${response.data.token_type} ${response.data.access_token}`,
                ...headers
                
            }
        });
        const {email,id,avatar} = userResponse.data;
        const checkUserWithDiscord = await User.findOne({email});
        if (!checkUserWithDiscord) {
// ---------------------------------Creating a new user with discord---------------------------------
            const user = await User.create({email: email, discordId: id,avatar:"https://cdn.discordapp.com/avatars/"+id+"/"+avatar+".png"})
            const token = generateToken({ email: user.email, id: user._id })
            console.log("signed in",user)
            return res.status(200).json({token,user})
            
        } else {
            res.status(200).json({message:"User already exists"})
        }


        



        
    }





