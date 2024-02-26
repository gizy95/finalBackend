import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log("Connection succesful");
        return mongoose.connect;

    } catch (error) {
        console.log("Connection failed", error.message);
        process.exit(1);
    }
}