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

// ================================================================

// import { User } from "../models/userModel.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// /* ==========================
//     USER REGISTER CONTROLLER
// ========================== */

// export const userRegisterFunc = async (req, res) => {

//     try {
        
//         // --------- Get User data ---------

//         const { name, email, password } = req.body || {}

//         // --------- Validate input fields ---------

//         if (!name || !email || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // --------- Check if user already exists ---------

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(409).json({ message: "User already exists" });
//         }

//         // --------- Make Normal Password to Hash Password using bcrypt ---------

//         const saltOrRounds = 10
//         const hashPassword = await bcrypt.hash(password , saltOrRounds)

//         // --------- Create new user in database ---------

//         const user = await User.create({
//             name,
//             email,
//             password: hashPassword
//         })

//         // --------- Send Token and User success response ---------

//         res.json({
//             message: 'User registered successfully. Please login.',
//             user
//         });

//     }
//     catch (error) {
//         // --------- Handle unexpected server errors ---------

//         res.status(500).json({
//             message: "Server Error",
//             error: error.message,
//         });
//     }

// }

// /* ==========================
//     USER LOGIN CONTROLLER
// ========================== */

// export const userLoginFunc = async (req, res) => {

//     try {
        
//         // --------- Get User Details ---------

//         const { email, password } = req.body || {}

//         // --------- Validate input fields ---------

//         if (!email || !password) {
//             return res.status(400).json({
//                 message: "Email and password are required",
//             });
//         }

//         // --------- Find user by email ---------

//         const user = await User.findOne({ email })

//         if (!user) {
//             return res.status(401).json({ 
//                 message: "Invalid credentials",
//                 user
//             });
//         }

//         // --------- Compare entered password with hashed password ---------

//         const passwordMatch = await bcrypt.compare(password , user.password)

//         if (!passwordMatch) {
//             return res.status(401).json({
//                 message: "Invalid email or password",
//             });
//         }

//         // --------- Generate JWT token after successful login ---------

//         const token = jwt.sign(
//             {
//                 userId: user._id
//             },
//             process.env.JWT_SECRET,
//             {
//                 expiresIn: "24h"
//             }
//         )

//         // user.password = undefined;

//         // --------- Send Token and User success response ---------

//         res.status(200).json({
//             message: 'Login successful!',
//             token,
//             user
//         });

//     }
//     catch (error) {
//         // --------- Handle unexpected server errors ---------

//         res.status(500).json({
//             message: "Server Error",
//             error: error.message,
//         });
//     }

// }

// ================================================================

import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* ==========================
    USER REGISTER CONTROLLER
========================== */

export const userRegisterFunc = async (req, res) => {

    try {
        
        // --------- Get User data ---------

        const { name, email, password, role } = req.body || {}

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
            password: hashPassword,
            role: role || "user",
            createdAt: new Date(),
        })

        // --------- Hide password in response ---------
        user.password = undefined;

        // --------- Send Token and User success response ---------

        res.status(201).json({
            message: 'User registered successfully. Please login.',
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

/* ==========================
    USER LOGIN CONTROLLER
========================== */

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

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ 
                message: "Invalid credentials",
                user
            });
        }

        // --------- Compare entered password with hashed password ---------

        const passwordMatch = await bcrypt.compare(password , user.password)

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // --------- Generate JWT token after successful login ---------

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        )

        // --------- Hide password ---------

        user.password = undefined;

        // --------- Send Token and User success response ---------

        res.status(200).json({
            message: 'Login successful!',
            token,
            user,
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
