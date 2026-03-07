import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {

    try {
        const authorization = req.headers.authorization || {}

        // Check if header exists and starts with 'Bearer'
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Unauthorized Access: No token provided" });
        }

        const token = authorization.split(' ')[1]

        // Verify token
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        console.log(decoded)

        // 3. Find user (Make sure your token payload has 'userId' or '_id')
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        // req.user = {
        //     userId: user._id,
        //     role: user.role,
        // }

        req.user = user;

        // req.user = {
        //     _id: jwtData.userId,
        //     role: jwtData.role,
        // }

        next()
    } catch (error) {
        console.log("JWT Error:", error.message);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

}