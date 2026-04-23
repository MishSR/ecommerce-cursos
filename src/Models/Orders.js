import mongoose from "mongoose";

const orderschema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [{
        course_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        }
    }],
    total_price: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    },
});
export default mongoose.model("Order", orderschema);

