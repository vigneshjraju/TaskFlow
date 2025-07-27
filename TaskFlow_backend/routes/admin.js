import express from "express";
import { adminauth } from "../middleware/adminauth.js";
import UserLog from "../Model/UserLog.js";

const adminRoutes = express.Router();


adminRoutes.get("/logs", adminauth, async (req, res) => {
    try {
        const logs = await UserLog.find().sort({ createdAt: -1 });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch logs", error: err.message });
    }
});


adminRoutes.delete("/logs/:id", adminauth, async (req, res) => {
    try {
        await UserLog.findByIdAndDelete(req.params.id);
        res.json({ message: "Log deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete log", error: err.message });
    }
});

export default adminRoutes;