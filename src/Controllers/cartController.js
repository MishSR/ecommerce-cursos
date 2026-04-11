import Cart from "../Models/Cart.js";


const getCart = async (req, res, next) => {
    try {
        const cart = await Cart.find()
        .populate("user")
        .populate("courses");
        res.status(200).json(cart);
    }   catch (error) { 
        next(error);
    }
};

const getCartById  = async (req, res, next) => {
    try {
        const {id} = req.params;
        const cart = await Cart.findId (id)
        .populate("user")
        .populate("courses");
        if (!cart) {
            return res.status(404).json({message: "Cart not found"});
        }
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

const getCartByUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const cart = await Cart.findOne({ user: userId })
        .populate("user")
        .populate("courses");   
        if (!cart) {
            return res.status(404).json({message: "Cart not found for this user"});
        }
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }   
};

const createCart = async (req, res, next) => {
    try {
        const {user, courses} = req.body;

        if (!user || !courses || !Array.isArray(courses)) {
            return res.status(400).json({message: "user and courses are required, and courses must be an array"});
        }

        for (let i = 0; i < courses.length; i++) {
            if (!courses[i] ||
                !courses [i].quantity ||
                courses [i].quantity < 1) {
                    return res.status(400).json({message: "Each course must have a valid quantity of at least 1"});
                }
        }

        const newCart = await Cart.create({user, courses});
        await createCart.populate("user").populate("courses.course");
        res.status(201).json(newCart);
    }
    catch (error) {
        next(error);
    }   

    async function updateCart( req, res, next) {
        try {
            const {id} = req.params;
            const {user, courses} = req.body;

            if  (!user || !courses || !Array.isArray(courses)) {
                return res.status(400).json({message: "user and courses are required, and courses must be an array"});

            for (let i = 0; i < courses.length; i++) {
                if (!courses[i] ||
                    !courses[i].quantity ||
                    courses[i].quantity < 1) {
                        return res.status(400).json({message: "Each course must have a valid quantity of at least 1"});
                    }
            }

            const updatedCart = await Cart.findByIdAndUpdate(
                id,
                {user, courses},
                {new: true}
            ).populate("user").populate("courses.course");
            if (updatedCart) {
                return res.status(200).json(updatedCart);
            } else {
                return res.status(404).json({message: "Cart not found"});
            }
        } catch (error) {
            next(error);
        }
    }