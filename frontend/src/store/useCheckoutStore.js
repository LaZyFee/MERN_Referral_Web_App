import { create } from "zustand";
import axiosInstance from "../utils/axios";

export const useCheckoutStore = create((set) => ({
  checkoutData: null,
  isLoading: false,
  error: null,

  buyProducts: async (items) => {
    try {
      set({ isLoading: true, error: null });

      const token = localStorage.getItem("token");

      const res = await axiosInstance.post(
        "/checkout/buy",
        { items },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({ checkoutData: res.data, isLoading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to load checkout data",
        isLoading: false,
      });
    }
  },
}));
