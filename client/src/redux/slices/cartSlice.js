import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {
        addCart: (state, action) => {
            state.items.push(action.payload);
        },
        clearCart: (state, action) => {
            state.items = []
        }
    }
})

export const { clearCart, addCart } = cartSlice.actions;
export default cartSlice.reducer
