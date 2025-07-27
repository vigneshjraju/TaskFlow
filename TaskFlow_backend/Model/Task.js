import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false }
}, { timestamps: true });

const TaskModel = model("Task", taskSchema);

export default TaskModel;