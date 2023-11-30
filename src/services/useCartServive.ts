// Import necessary dependencies and utilities
import { create } from 'zustand';
import { useFetch } from '@/helpers/client';

// Define the initial state for the cart store
const initialCartState = {
  cart: [],
};

// Create the Zustand store for the cart
const cartStore = create<ICartStore>(() => initialCartState);

// Define the CRUD functions for the cart service
function useCartService(): ICartService {
  const fetch = useFetch();
  const { cart } = cartStore();

  return {
    cart,
    addToCart: async (productId: string, quantity: number) => {
      // Perform any validation or business logic here if needed

      // Update the cart state
      cartStore.setState({
        cart: [...cart, { productId, quantity }],
      });
    },
    removeFromCart: async (productId: string) => {
      // Update the cart state by filtering out the specified product
      cartStore.setState({
        cart: cart.filter((item) => item.productId !== productId),
      });
    },
    clearCart: async () => {
      // Clear the entire cart by setting it to an empty array
      cartStore.setState({
        cart: [],
      });
    },
    // Add additional cart-related CRUD operations as needed
  };
}

// Define the interfaces for the cart model
interface ICartItem {
  productId: string;
  quantity: number;
}

interface ICartStore {
  cart: ICartItem[];
}

interface ICartService extends ICartStore {
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  // Add additional cart-related CRUD operations as needed
}
