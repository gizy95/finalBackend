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
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
    },
    avatar: {
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AWindows_10_Default_Profile_Picture.svg&psig=AOvVaw1mi96GQD1vpUBnc1rSwB8L&ust=1709027300064000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIiL7vrcyIQDFQAAAAAdAAAAABAE'

    },
    birthdate: {
        type: Date
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
        type: Array
    },
    following: {
        type: Array
    },
    bio: {
        type: String
    }
});
const User = mongoose.model('User', userSchema);
export default User;
