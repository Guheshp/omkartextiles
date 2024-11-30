import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {
        addCart: (state, action) => {
            const existingItem = state.items.find(item => item._id === action.payload._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeCart: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
        },

        clearCart: (state, action) => {
            state.items = []
        },
        incrementQuantity: (state, action) => {
            const item = state.items.find(item => item._id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.items.find(item => item._id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.items = state.items.filter(item => item._id !== action.payload);
                }
            }
        }
    }
})

export const { clearCart, addCart, removeCart, decrementQuantity, incrementQuantity } = cartSlice.actions;
export default cartSlice.reducer
