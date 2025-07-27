import { Schema, model } from "mongoose";

const userLogSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], required: true },
    jwtTokenName: { type: String, required: true }, // e.g., "authToken" or "adminToken"
    ipAddress: { type: String },
    loginTime: { type: Date, default: Date.now },
    logoutTime: { type: Date, default: null }
}, { timestamps: true });

const UserLog = model("UserLog", userLogSchema);

export default UserLog;