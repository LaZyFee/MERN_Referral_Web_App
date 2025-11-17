import { create } from "zustand";
import axiosInstance from "../utils/axios";

export const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await axiosInstance.get("/products/get-products");
      set({ products: res.data, isLoading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to load products",
        isLoading: false,
      });
    }
  },
  addProduct: async (productData) => {
    try {
      set({ isLoading: true, error: null });
      const res = await axiosInstance.post(
        "/products/add-product",
        productData
      );
      set((state) => ({
        products: [...state.products, res.data],
        isLoading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to add product",
        isLoading: false,
      });
    }
  },
}));
