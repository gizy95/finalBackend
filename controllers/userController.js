import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from "axios";
import Post from "../models/post.js";
import cloudinary from "../db/configCloudinary.js";


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
    const { id } = req.user;

    try {
        const { name, surname, birthdate, bio, birthplace, username } = req.body;

        let update = {};

        if (name !== undefined) update.name = name;
        if (surname !== undefined) update.surname = surname;
        if (birthdate !== undefined) update.birthdate = birthdate;
        if (bio !== undefined) update.bio = bio;
        if (birthplace !== undefined) update.birthplace = birthplace;
        if (username !== undefined) update.username = username;

        const data = await User.findByIdAndUpdate(id, update, { new: true })
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}


export const modifyAvatar = async (req, res) => {

    try {
        const { id } = req.params;
        let imageUrl = '';

        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({
                    folder: "avatar"
                }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                });
                uploadStream.end(req.file.buffer);
            });
            imageUrl = result.url;

            // Update the user document with the new avatar image URL
            const updatedUser = await User.findByIdAndUpdate(id, { avatar: imageUrl }, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            // Return the updated user object with the new avatar image URL
            return res.status(200).json(updatedUser);
        } else {
            // If no file is provided, return a 400 Bad Request response
            return res.status(400).json({ message: "No avatar file provided" });
        }
    } catch (error) {
        console.error("Error modifying avatar:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user, "user")
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
        console.log(err)
    }
}

export const getSingleUser = async (req, res) => {
    const { id } = req.user;

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

export const getUser = async (req, res) => {
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

export const redirecttoDiscord = async (req, res) => {
    const Url = "https://discord.com/oauth2/authorize?client_id=1214873733408358450&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fuser%2Fauth%2Fdiscord%2Fcallback&scope=email+identify"
    res.redirect(Url)

}

export const getCodeandSignUpwithDiscord = async (req, res) => {
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


    const response = await axios.post('https://discord.com/api/oauth2/token', params, {
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
    const { email, id, avatar, username } = userResponse.data;
    const checkUserWithDiscord = await User.findOne({ email });
    if (!checkUserWithDiscord) {
        // ---------------------------------Creating a new user with discord---------------------------------

        const hashedPassword = await bcrypt.hash(id, 10);
        const user = await User.create({ email: email, username: username, discordId: id, password: hashedPassword, avatar: "https://cdn.discordapp.com/avatars/" + id + "/" + avatar + ".png" })
        const token = generateToken({ email: user.email, id: user._id })

        console.log("signed in", user)
        return res.status(200).json({ token, user })

    } else {

        // ---------------------------------Logging in with discord---------------------------------

        const token = generateToken({ email: checkUserWithDiscord.email })
        console.log(token)
        return res.status(201).json({ token, checkUserWithDiscord, message: "User already exists" })
    }


}

export const followandUnfollowUser = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId)
        if (user.following.includes(id)) {
            await User.findByIdAndUpdate(userId, { $pull: { following: id } }, { new: true })
            await User.findByIdAndUpdate(id, { $pull: { followers: userId } }, { new: true })
            res.status(200).json({ message: "User unfollowed" })
        } else {
            await User.findByIdAndUpdate(userId, { $push: { following: id } }, { new: true })
            await User.findByIdAndUpdate(id, { $push: { followers: userId } }, { new: true })
            res.status(200).json({ message: "User followed" })
        }
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}


export const getFollowers = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id)
        res.status(200).json(user.followers)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}
export const getFollowings = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id)
        res.status(200).json(user.following)
    }
    catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}

export const likeandUnlikeUser = async (req, res) => {
    const { id } = req.user; // Assuming user ID is available in req.user
    const { postId } = req.body; // Extract postId from the request body
    console.log(postId)
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.likes.includes(id)) {
            // Unlike the post
            await Post.findByIdAndUpdate(postId, { $pull: { likes: id } }, { new: true });
            return res.status(200).json({ message: post._id, "post unliked by user_id": id });
        } else {
            // Like the post
            await Post.findByIdAndUpdate(postId, { $push: { likes: id } }, { new: true });
            return res.status(200).json({ message: post._id, "post liked by user_id": id });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const countLikes = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const likeCount = post.likes.length;
        res.status(200).json({ count: likeCount });
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
}

