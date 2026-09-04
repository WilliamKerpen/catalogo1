import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/cartSlice";
import favoritesReducer from "./slices/favoritesSlice";

/**
 * Store principal da aplicação.
 *
 * Aqui registramos todos os reducers globais.
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});

/**
 * Tipo que representa todo o estado do Redux.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Tipo utilizado pelo dispatch.
 */
export type AppDispatch = typeof store.dispatch;