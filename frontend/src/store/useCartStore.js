import { create } from "zustand";

export const useCartStore = create((set) => ({
    cart: JSON.parse(localStorage.getItem("cart")) || [],

    addToCart: (product) =>
        set((state) => {
            const existingItem = state.cart.find((item) => item._id === product._id);

            let updatedCart;

            if (existingItem) {
                //  increase quantity
                updatedCart = state.cart.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add as new item
                updatedCart = [...state.cart, { ...product, quantity: 1 }];
            }

            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return { cart: updatedCart };
        }),

    // Remove from cart
    removeFromCart: (id) =>
        set((state) => {
            const updatedCart = state.cart.filter((item) => item._id !== id);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return { cart: updatedCart };
        }),

    // Change quantity
    updateQuantity: (id, qty) =>
        set((state) => {
            const updatedCart = state.cart.map((item) =>
                item._id === id ? { ...item, quantity: qty } : item
            );

            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return { cart: updatedCart };
        }),

    // Clear cart
    clearCart: () =>
        set(() => {
            localStorage.removeItem("cart");
            return { cart: [] };
        }),

}));
