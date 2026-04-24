import Courses from "../Models/Courses.js";

const getCourses = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const total = await Courses.countDocuments();
        const courses = await Courses.find()
            .populate("category", "name description")
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            data: courses
        });
    } catch (error) {
        next(error);
    }
};

const getCourseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const course = await Courses.findById(id)
            .populate("category", "name description");
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        next(error);
    }
};

const createCourse = async (req, res, next) => {
    try {
        const { title, description, price, duration, instructor, category } = req.body;
        const newCourse = await Courses.create({
            title,
            description,
            price,
            duration,
            instructor,
            category,
            user_id: req.user.id,
        });
        await newCourse.populate("category", "name description");
        res.status(201).json(newCourse);
    } catch (error) {
        next(error);
    }
};

const updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, price, duration, instructor, category } = req.body;
        const course = await Courses.findByIdAndUpdate(
            id,
            { title, description, price, duration, instructor, category },
            { new: true }
        ).populate("category", "name description");
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        next(error);
    }
};

const deleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const course = await Courses.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export { getCourses, getCourseById, createCourse, updateCourse, deleteCourse };