import Cart from "../Models/Cart.js";

const getCart = async (req, res, next) => {
    try {
        const cart = await Cart.find()
            .populate("user_id", "name email")
            .populate("items.course_id", "title price");
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

const getCartById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findById(id)
            .populate("user_id", "name email")
            .populate("items.course_id", "title price");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

const getCartByUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const cart = await Cart.findOne({ user_id: userId })
            .populate("user_id", "name email")
            .populate("items.course_id", "title price");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found for this user" });
        }
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

const createCart = async (req, res, next) => {
    try {
        const { user_id, items } = req.body;

        const newCart = await Cart.create({ user_id, items });
        await newCart.populate("user_id", "name email");
        await newCart.populate("items.course_id", "title price");
        res.status(201).json(newCart);
    } catch (error) {
        next(error);
    }
};

const updateCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user_id, items } = req.body;

        const updatedCart = await Cart.findByIdAndUpdate(
            id,
            { user_id, items },
            { new: true }
        )
            .populate("user_id", "name email")
            .populate("items.course_id", "title price");

        if (!updatedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(updatedCart);
    } catch (error) {
        next(error);
    }
};

const deleteCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedCart = await Cart.findByIdAndDelete(id);
        if (!deletedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export { getCart, getCartById, getCartByUser, createCart, updateCart, deleteCart };