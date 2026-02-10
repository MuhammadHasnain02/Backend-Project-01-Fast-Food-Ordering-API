import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {

    try {
        
        const { authorization } = req.headers || {}

        if (!authorization) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authorization.split(' ')[1]

        const jwtData = jwt.verify(token , process.env.JWT_SECRET)

        req.body = {
            ...req.body,
            id: jwtData.userId,
        }

        console.log(req.body)

        next()

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

}