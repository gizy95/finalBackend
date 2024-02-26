import 'dotenv/config';
import express from 'express';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('This is a root')
})

app.get('/', (req, res) => {
    res.send("root")
})

app.listen(port, () => {
    console.log('App listening on a port ' + port)
})