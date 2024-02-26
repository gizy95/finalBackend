import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    
    created: {
        type: Date,
        default: Date.now
    },
     API: {
        type: String,
        required: true
}
});

const Game = mongoose.model('Game', gameSchema);
export default Game;