import Payment from "../Models/Payment.js";

const getPayments = async (req, res, next) => {
    try {
        const payments = await Payment.find()
            .populate("user", "name email");
        res.status(200).json(payments);
    } catch (error) {
        next(error);
    }
};

const getPaymentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findById(id)
            .populate("user", "name email");
        if (!payment) {
            return res.status(404).json({ message: "Payment method not found" });
        }
        res.status(200).json(payment);
    } catch (error) {
        next(error);
    }
};

const createPayment = async (req, res, next) => {
    try {
        const { user, method, cardNumber, cardHolder, expiryDate, paypalEmail, bankName, accountNumber, isADefault, isActive } = req.body;

        if (isADefault) {
            await Payment.updateMany({ user }, { isADefault: false });
        }

        const newPayment = await Payment.create({
            user,
            method,
            cardNumber,
            cardHolder,
            expiryDate,
            paypalEmail,
            bankName,
            accountNumber,
            isADefault: isADefault || false,
            isActive: isActive !== undefined ? isActive : true,
        });
        await newPayment.populate("user", "name email");
        res.status(201).json(newPayment);
    } catch (error) {
        next(error);
    }
};

const updatePayment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user, method, cardNumber, cardHolder, expiryDate, paypalEmail, bankName, accountNumber, isADefault, isActive } = req.body;

        const existingPayment = await Payment.findById(id);
        if (!existingPayment) {
            return res.status(404).json({ message: "Payment method not found" });
        }

        
        if (isADefault) {
            await Payment.updateMany(
                { user, _id: { $ne: id } },
                { isADefault: false }
            );
        }

        const updatedPayment = await Payment.findByIdAndUpdate(
            id,
            {
                user,
                method,
                cardNumber,
                cardHolder,
                expiryDate,
                paypalEmail,
                bankName,
                accountNumber,
                isADefault: isADefault !== undefined ? isADefault : existingPayment.isADefault,
                isActive: isActive !== undefined ? isActive : existingPayment.isActive,
            },
            { new: true }
        ).populate("user", "name email");

        res.status(200).json(updatedPayment);
    } catch (error) {
        next(error);
    }
};

const deletePayment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findByIdAndDelete(id);
        if (!payment) {
            return res.status(404).json({ message: "Payment method not found" });
        }
        res.status(200).json({ message: "Payment method deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export { getPayments, getPaymentById, createPayment, updatePayment, deletePayment };