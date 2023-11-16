import { db } from './db';

const Cart = db.Cart; // Adjust this based on your actual Cart model

export const cartRepo = {
  addToCart,
  getUserCart,
  removeFromCart,
  clearCart,
};

async function addToCart(userId: string, productId: string, quantity: number) {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      {
        $push: { items: { productId, quantity } },
      },
      { new: true, upsert: true }
    );
    if (!cart){
        await Cart.create({userId, items: [{productId, quantity}]});
    }

    return cart;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
}

async function getUserCart(userId: string) {
  try {
    const cart = await Cart.findOne({ userId });
    return cart;
  } catch (error) {
    console.error('Error fetching user cart:', error);
    throw error;
  }
}

async function removeFromCart(userId: string, productId: string) {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      {
        $pull: { items: { productId } },
      },
      { new: true }
    );

    return cart;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
}

async function clearCart(userId: string) {
  try {

    //need to check further if this is the right way to do it

    // const cart = await Cart.findOneAndRemove({ userId });
    // return cart;
  } catch (error) {
    console.error('Error clearing user cart:', error);
    throw error;
  }
}
