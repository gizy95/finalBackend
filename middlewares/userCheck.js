import User from './models/user.js';


export const userCheck = async (req, res, next) => {
    const { email } = req.body;


    if (req.method === "GET" || req.method === "DELETE" || req.method === "PUT") {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (user) {
            req.User = user;
            next();
        } else {
            return res.status(404).json({ message: "User not found" });

        }
    } else if (req.method === "POST") {
        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        } else {
            next();
        }
    }
}