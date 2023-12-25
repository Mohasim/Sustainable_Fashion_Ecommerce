import { create } from 'zustand';
import { useRouter } from 'next/navigation';

import { useFetch } from '@/helpers/client';

export { useProductService };

// product state store
const initialState = {
  products: undefined,
  product: undefined,
};

const productStore = create<IProductStore>(() => initialState);

function useProductService(): IProductService {
  const fetch = useFetch();
  const router = useRouter();
  const { products, product } = productStore();

  return {
    products,
    product,
    getAll: async () => {
      productStore.setState({ products: await fetch.get(`/api/products`) });
    },
    getById: async (id) => {
      productStore.setState({ product: undefined });
      productStore.setState({ product: await fetch.get(`/api/products/${id}`) });
    },
    create: async (product) => {
      await fetch.post(`/api/products`, product);
    },
    update: async (id, params) => {
      await fetch.put(`/api/products/${id}`, params);
    },
    delete: async (id) => {
      // set isDeleting prop to true on product
      productStore.setState({
        products: products!.map((x) => {
          if (x.id === id) {
            x.isDeleting = true;
          }
          return x;
        }),
      });

      // delete product
      await fetch.delete(`/api/products/${id}`);

      // remove deleted product from state
      productStore.setState({ products: products!.filter((x) => x.id !== id) });
    },
  };
}

// interfaces

interface IProduct {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  isDeleting?: boolean;
}

interface IProductStore {
  products?: IProduct[];
  product?: IProduct;
}

interface IProductService extends IProductStore {
  getAll: () => Promise<void>;
  getById: (id: string) => Promise<void>;
  create: (product: IProduct) => Promise<void>;
  update: (id: string, params: Partial<IProduct>) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
