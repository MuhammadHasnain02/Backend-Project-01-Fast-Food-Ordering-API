import express from "express";
import { userLoginFunc, userRegisterFunc } from "../controllers/userControllers.js";

export const userRoutes = express.Router();

userRoutes.post('/register' , userRegisterFunc)
userRoutes.post('/login' , userLoginFunc)
