import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductsCollection } from "@/types/product";

const loadProductsFromLocalStorage = (): Product[] => {
  if (typeof window !== "undefined") {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : [];
  }
  return [];
};

const initialState: ProductsCollection = {
  items: loadProductsFromLocalStorage(),
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addProduct, editProduct, deleteProduct, setProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
