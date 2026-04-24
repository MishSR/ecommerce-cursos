import Orders from "../Models/Orders.js";

const getOrders = async (req, res, next) => {
    try {
        const orders = await Orders.find()
            .populate("user", "name email")
            .populate("items.courses", "title price");
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Orders.findById(id)
            .populate("user", "name email")
            .populate("items.courses", "title price");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

const getOrdersByUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const orders = await Orders.find({ user: userId })
            .populate("user", "name email")
            .populate("items.courses", "title price");
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

const createOrder = async (req, res, next) => {
    try {
        const { user, items, total_price, status } = req.body;
        const order = await Orders.create({ user, items, total_price, status });
        await order.populate("user", "name email");
        await order.populate("items.courses", "title price");
        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};

const updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user, items, total_price, status } = req.body;
        const order = await Orders.findByIdAndUpdate(
            id,
            { user, items, total_price, status },
            { new: true }
        )
            .populate("user", "name email")
            .populate("items.courses", "title price");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Orders.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export { getOrders, getOrderById, getOrdersByUser, createOrder, updateOrder, deleteOrder };