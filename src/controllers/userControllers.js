// import { User } from "../models/userModel.js";
// import bcrypt from "bcrypt";

// export const userRegisterFunc = async (req, res) => {

//     const { name, email, password } = req.body || {}

//     const saltOrRounds = 10
//     const hashPassword = await bcrypt.hash(password , saltOrRounds)

//     const user = await User.create({
//         name,
//         email,
//         password: hashPassword
//     })

//     res.json({
//         message: 'User Registered!',
//         user
//     });
// }

// export const userLoginFunc = async (req, res) => {

//     const { email, password } = req.body || {}
    
//     const [ user ] = await User.find({ email })

//     if (!user) {
//         return res.status(400).send("User not found!");
//     }

//     const passwordMatch =  await bcrypt.compare(password , user.password)

//     if (passwordMatch) {
//         res.json({
//             message: 'User Logged In!',
//             user
//         });
//     }
//     else {
//         res.status(400).json({ message: "Something Went Wrong!" });
//     }

// }

// --------------------------------------------------------

import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../app.js";

/* =======================
   USER REGISTER CONTROLLER
======================= */

export const userRegisterFunc = async (req, res) => {

    try {
        
        // --------- Get User data ---------

        const { name, email, password } = req.body || {}

        // --------- Validate input fields ---------

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // --------- Check if user already exists ---------

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // --------- Make Normal Password to Hash Password using bcrypt ---------

        const saltOrRounds = 10
        const hashPassword = await bcrypt.hash(password , saltOrRounds)

        // --------- Create new user in database ---------

        const user = await User.create({
            name,
            email,
            password: hashPassword
        })

        // --------- Generate JWT token ---------

        const token = jwt.sign(
            {
                userId: user._id
            },
            SECRET_KEY,
            {
                expiresIn: "24h"
            }
        )

        // --------- Send Token and User success response ---------

        res.json({
            message: 'User Registered!',
            token,
            user
        });

    }
    catch (error) {
        // --------- Handle unexpected server errors ---------

        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }

}

/* =======================
   USER LOGIN CONTROLLER
======================= */

export const userLoginFunc = async (req, res) => {

    try {
        
        // --------- Get User Details ---------

        const { email, password } = req.body || {}

        // --------- Validate input fields ---------

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // --------- Find user by email ---------

        const [ user ] = await User.find({ email })

        if (!user) {
            return res.status(401).json({ 
                message: "Invalid email or password",
                user
            });
        }

        // --------- Compare entered password with hashed password ---------

        const passwordMatch =  await bcrypt.compare(password , user.password)

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // --------- Generate JWT token after successful login ---------

        const token = jwt.sign(
            {
                userId: user._id
            },
            SECRET_KEY,
            {
                expiresIn: "24h"
            }
        )

        // --------- Send Token and User success response ---------

        res.json({
            message: 'User Logged In!',
            token,
            user
        });

    }
    catch (error) {
        // --------- Handle unexpected server errors ---------

        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }

}
