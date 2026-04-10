import Courses from "../Models/Courses.js";

const getCourses = async (req, res, next) => {
    try {
        const courses = await Courses.find();
        res.status(200).json(courses);
    } catch (error) {
        next(error);
    }   
};

const getCourseById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const course = await Courses.findById(id);
        if (!course) {
            return res.status(404).json({message: "Course not found"});
        }
        res.status(200).json(course);
    } catch (error) {
        next(error);
    }
};

// const createCourse = async (req, res, next) => {
//     try {
//         const {title, description, price} = req.body;
//         const newCourse = await Courses.create({title, description, price});
//         res.status(201).json(newCourse);
//     } catch (error) {
//         next(error);
//     }   
// };

export { getCourses, getCourseById };
