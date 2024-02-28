import mongoose from 'mongoose';


const gameSettingsSchema = new mongoose.Schema({
    gamerTag: {
        type: String,
        required: true,
    },
    region: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    APIUrl: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    },


});
const GameSettings = mongoose.model('GameSettings', gameSettingsSchema);

export default GameSettings;
