import 'dotenv/config';
import express from 'express';
import cors from "cors";
import { connectDB } from "./db/client.js"

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json())

const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Port listens on port ${port}`)
    })
}


startServer().catch(error => {
    console.log(error, "Failed to start the server")
})