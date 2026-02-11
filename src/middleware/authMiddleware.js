import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {

    try {
    
        const authorization = req.headers.authorization || {}
    
        if (!authorization) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authorization.split(' ')[1]

        const jwtData = jwt.verify(token , process.env.JWT_SECRET)
        console.log('jwtData:' , jwtData)

        req.user = {
            _id: jwtData.userId,
            role: jwtData.role
        }

        next()

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

}