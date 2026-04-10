import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
});

const Review = mongoose.model("Review", reviewsSchema);

export default Review;