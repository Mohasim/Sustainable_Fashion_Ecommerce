import mongoose from "mongoose";

export { orderModel };

function orderModel() {
    const OrderSchema = new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        orderItems: [{
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        }],
        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        paymentMethod: { type: String, required: true },
        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String,
        },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        taxPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    return mongoose.models.Order || mongoose.model('Order', OrderSchema);
}