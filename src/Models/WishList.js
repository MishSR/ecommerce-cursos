import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }],
}, {
    timestamps: true,
});

const WishList = mongoose.model("WishList", wishListSchema);
export default WishList;