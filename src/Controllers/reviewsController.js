import Review from "../Models/Reviews";

const getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find()
        .populate("user_id", "name")
        .populate("course_id", "title");
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
};

const getReviewById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id)
            .populate("user_id", "name")
            .populate("course_id", "title");
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
};

const createReview = async (req, res, next) => {
    try {
        const { user_id, course_id, rating, comment } = req.body;
        const review = new Review({ user_id, course_id, rating, comment });
        await review.save();
        await review.populate("user_id", "name")
            .populate("course_id", "title");
        res.status(201).json(review);
    } catch (error) {
        next(error);
    }
};

export { getReviews, getReviewById, createReview };

