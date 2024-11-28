import { createSlice } from "@reduxjs/toolkit";

const sideBarToggleSlice = createSlice({
    name: "sideBarToggle",
    initialState: {
        sideBar: false
    },
    reducers: {
        isToggle: (state, actions) => {
            state.sideBar = !state.sideBar
        },
        closeToggle: (state, action) => {
            state.sideBar = false
        },
        trueToggle: (state, action) => {
            state.sideBar = true
        }
    }
})

export const { isToggle, closeToggle, trueToggle } = sideBarToggleSlice.actions;
export default sideBarToggleSlice.reducer