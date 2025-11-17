import { create } from "zustand";
import axiosInstance from "../utils/axios";

export const useAuth = create((set) => ({
  user: (() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  })(),
  isAuthenticated: !!localStorage.getItem("user"),
  error: null,
  isLoading: false,

  // Signup function
  signup: async (formData) => {
    console.log(formData);
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/users/register", formData);
      const { user, token } = response.data;

      if (user && token) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        set({ user, isAuthenticated: true, isLoading: false });
      } else {
        throw new Error("User or token not provided in response");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      const errorMessage = error.response?.data?.message || "Error signing up";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // Login function
  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/users/login", {
        username,
        password,
      });
      const { user, token } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  // Logout function
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post("/users/logout");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },
}));
