import mongoose from "mongoose";

export { productModel };

function productModel() {
    const ProductSchema = new mongoose.Schema({
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String },
        description: { type: String },
        category: { type: String, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number, required: true },
        numReviews: { type: Number, required: true },
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    return mongoose.models.Product || mongoose.model('Product', ProductSchema);
}