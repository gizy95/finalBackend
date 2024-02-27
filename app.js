import 'dotenv/config';
import express from 'express';
import cors from "cors";
import { connectDB } from "./db/client.js"
import userRoutes from './routes/userRouter.js';
import postRoutes from './routes/postRouter.js';
import gameRoutes from './routes/gameRouter.js';
import uploadRouter from './routes/uploads.js';


const app = express();
const port = 8000 || process.env.PORT;

app.use(cors());
app.use(express.json())
app.use("/user", userRoutes)
app.use("/post", postRoutes)
app.use("/games", gameRoutes)
app.use('/upload', uploadRouter);

const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Port listens on port ${port}`)
    })
}


startServer().catch(error => {
    console.log(error, "Failed to start the server")
})