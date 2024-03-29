import mongoose from 'mongoose';

const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        // unique: true, mondodb doesnt support unique feature
        match: [emailRegex, 'Invalid email']
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,

    },
    username: {
        type: String,
        required: true
    },
    surname: {
        type: String,
    },
    discordId: {
        type: String,
    },
    avatar: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/512px-Windows_10_Default_Profile_Picture.svg.png?20221210150350'

    },
    birthplace: {
        type: String
    },
    birthdate: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    lastlogin: {
        type: Date
    },
    games: {
        type: Array
    },
    followers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    },
    following: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    },
    bio: {
        type: String,
        default: "Some text here"
    },
    gameSettings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GameSettings' }] // Reference to GameSettings
});
const User = mongoose.model('User', userSchema);

export default User;
