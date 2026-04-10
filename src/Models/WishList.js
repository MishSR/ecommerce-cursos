import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
    }],
}, {
    timestamps: true,
});

const WishList = mongoose.model("WishList", wishListSchema);
export default WishList;