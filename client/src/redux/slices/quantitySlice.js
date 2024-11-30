import { createSlice } from "@reduxjs/toolkit";

const quantitySlice = createSlice({
    name: "quantity",
    initialState: {
        quantuty: []
    },
    reducers: {
        addQuantity: (state, action) => {
            state.quantuty.push(action.payload)
        },

    }
})