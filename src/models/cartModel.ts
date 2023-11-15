import mongoose, { Document, Schema, Model } from 'mongoose';

export { cartModel };

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartDocument extends Document {
  userId: string;
  items: CartItem[];
}

type CartModelType = Model<CartDocument>;

function cartModel(): CartModelType {
  const CartSchema = new Schema<CartDocument>(
    {
      userId: { type: String, required: true },
      items: [
        {
          productId: { type: String, required: true },
          quantity: { type: Number, required: true },
        },
      ],
    },
    {
      timestamps: true,
    }
  );

  return mongoose.models.Cart || mongoose.model<CartDocument>('Cart', CartSchema);
}
