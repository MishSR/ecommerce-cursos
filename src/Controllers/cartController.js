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