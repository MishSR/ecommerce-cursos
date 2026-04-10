import WishList from "../Models/WishList";

const getWishList = async (req, res, next) => {
    try {
        const wishList = await WishList.find()
        .populate("user")
        .populate("courses");
        res.status(200).json(wishList);
    } catch (error) {
        next(error);
    }
};

const getWishListByUser= async (req, res, next) => {
    try {
        const {id} = req.params;
        const wishList = await WishList.findOne({user : id})
        .populate("user")
        .populate("courses");
        if (!wishList) {
            return res.status(404).json({message: "WishList not found"});
        }
        res.status(200).json(wishList);
    } catch (error) {
        next(error);
    }
};

const addToWishList = async (req, res, next) => {
    try {
        const {userId, courseId} = req.body;
        let wishList = await WishList.findOne({user : userId});
        if (!wishList) {
            wishList = new WishList({user: userId, courses: [courseId]});
        } else {
            const alreadyAdded = wishList.courses.some(course => course.toString() === courseId);
            if (alreadyAdded) {
                return res.status(400).json({message: "Course already in wish list"});
            }
            wishList.courses.push(courseId);
        }
        await wishList.save();
        await wishList.populate("user").populate("courses");
        res.status(200).json(wishList);
    } catch (error) {
        next(error);
    }
};

const removeFromWishList = async (req, res, next) => {
    try {
        const {id} = req.body;
        const {courseId} = req.params;
        const wishList = await WishList.findOne{id};    
        if (!wishList) {
            return res.status(404).json({message: "WishList not found"});
        }
        wishList.courses = wishList.courses.filter(course => course.toString() !== courseId);
        await wishList.save();
        await wishList.populate("user")
        await wishList.populate("courses");
        res.status(200).json(wishList);
    } catch (error) {
        next(error);
    }
};

const deleteWishList = async (req, res, next) => {
    try {
        const {id} = req.params;
        const wishList = await WishList.findByIdAndDelete(id);
        if (!wishList) {
            return res.status(404).json({message: "WishList not found"});
        }
        res.status(200).json({message: "WishList deleted successfully"});
    } catch (error) {
        next(error);
    }
};

export {getWishList, getWishListByUser, addToWishList, removeFromWishList, deleteWishList}; 
