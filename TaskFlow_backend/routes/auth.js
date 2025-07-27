import express from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { userModel } from "../Model/User.js";
import UserLog from "../Model/UserLog.js";

const authRoutes = express.Router();


authRoutes.post("/register", async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ fullName, email, password: hashedPassword, role });

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
});


authRoutes.post("/login",async (req, res) => {
    
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const payload = {
            userId: user._id,
            role: user.role
        };
        const tokenName = user.role === "admin" ? "adminToken" : "authToken";
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });

        
        await UserLog.create({
            userId: user._id,
            userName: user.fullName,
            role: user.role,
            jwtTokenName: tokenName,
            ipAddress: req.ip,
            loginTime: new Date()
        });

        res.cookie(tokenName, token, { httpOnly: true, sameSite: "lax" });
        res.json({ message: "Login successful", token, role: user.role });

    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
});


authRoutes.post("/logout", async (req, res) => {
    try {
        const { userId, userrole } = req;

        await UserLog.findOneAndUpdate(
            { userId, logoutTime: null },
            { logoutTime: new Date() }
        );
        res.clearCookie("authToken");
        res.clearCookie("adminToken");
        res.json({ message: "Logout successful" });
    } catch (err) {
        res.status(500).json({ message: "Logout failed", error: err.message });
    }
});

export default authRoutes;