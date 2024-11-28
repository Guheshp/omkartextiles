import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import cartReducer from "../redux/slices/cartSlice";
import sideBarToggleReduces from "../redux/slices/sideBarSlice"
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = ({
    key: "root",
    version: "1",
    storage
})

const rootReducer = combineReducers({
    cart: cartReducer,
    sideBarToggle: sideBarToggleReduces
})

const persistdReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistdReducer
})


const persistor = persistStore(store)

export { store, persistor };