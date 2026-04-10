import mongoose  from "mongoose";
import { act } from "react";

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    method: {
        type: string,
        required: true,
        enum: ["Credit Card", "Debit Card", "Paypal", "Bank Transfer"]
    },
    cardNumber: {
        type: String,
        max: 16,
        required: true,
    },
    cardHolder: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: String,
        required: true,
    },
    paypalEmail: {
        type: String,
    },
    bankName: {
        type: String,
    },
    accountNumber: {
        type: String,
    },
    isADefault: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
});

const Payment = mongoose.model("Payment", paymentSchema);       
export default Payment;
