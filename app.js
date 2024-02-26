import 'dotenv/config';
import express from 'express';

const app = express();
const port = 8000 || process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('This is a root')
})

app.get('/:code', (req, res) => {
    const code = req.params.code;
    try {
        const user = await User.findOne({ code  });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message,'Server Error' });
    }
})

app.listen(port, () => {
    console.log('App listening on a port ' + port)
})