import { Schema } from "mongoose";
import { model } from "mongoose";

const userSchema = new Schema({

    fullName:{ type:String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    resetToken: { type: String, default: null },
    resetTokenExpires: { type: Date, default: null }

}, { timestamps: true } )

const userModel = model("User",userSchema);

export {userModel}