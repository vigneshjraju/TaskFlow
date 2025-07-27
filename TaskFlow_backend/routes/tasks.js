import express from "express";
import authenticate from "../middleware/authentication.js";
import TaskModel from "../Model/Task.js";

const taskRoutes = express.Router();


taskRoutes.get("/", authenticate, async (req, res) => {
    try {
        const { status, search } = req.query;
        let filter = { userId: req.userid };
        if (status) filter.completed = status === "completed";
        if (search) filter.title = { $regex: search, $options: "i" };
        const tasks = await TaskModel.find(filter);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch tasks", error: err.message });
    }
});


taskRoutes.post("/", authenticate, async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = await TaskModel.create({
            userId: req.userid,
            title,
            description,
            completed: false
        });
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: "Failed to create task", error: err.message });
    }
});


taskRoutes.put("/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        const task = await TaskModel.findOneAndUpdate(
            { _id: id, userId: req.userid },
            { title, description, completed },
            { new: true }
        );
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Failed to update task", error: err.message });
    }
});


taskRoutes.delete("/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        await TaskModel.findOneAndDelete({ _id: id, userId: req.userid });
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete task", error: err.message });
    }
});

export default taskRoutes;