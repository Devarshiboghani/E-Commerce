import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: String,
    mobileNo: Number,
    profileImage: String,
    role: { 
        type: String, 
        default: "user", 
        enum: ["user", "admin"] 
    }
});

export default mongoose.models.User || mongoose.model("User", userSchema);