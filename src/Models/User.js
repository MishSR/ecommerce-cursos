import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
}, {
    timestamps: true,

    role: { 
        type: String, 
        enum: ["customer", "admin"], 
        default: "customer" 
    },
});

const User = mongoose.model("User", userSchema);

export default User;