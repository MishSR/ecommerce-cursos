import mongoose from "mongoose";

const cartschema = new mongoose.Schema({
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

}, {
    timestamps: true,
});

const Cart = mongoose.model("Cart", cartschema);

export default Cart;