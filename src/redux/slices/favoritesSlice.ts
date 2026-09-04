import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Representa um produto que pode ser favoritado.
 */
export interface FavoriteItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;

  // Permite manter outras propriedades do produto
  // que possam vir da API.
  [key: string]: any;
}

/**
 * Estado dos favoritos.
 */
interface FavoritesState {
  items: FavoriteItem[];
}

/**
 * Estado inicial.
 */
const initialState: FavoritesState = {
  items: [],
};

/**
 * Slice responsável pelos favoritos.
 */
const favoritesSlice = createSlice({
  name: "favorites",

  initialState,

  reducers: {

    /**
     * Adiciona ou remove um produto dos favoritos.
     */
    toggleFavorite: (
      state,
      action: PayloadAction<FavoriteItem>
    ) => {
      const product = action.payload;

      const exists = state.items.some(
        (item) => item.id === product.id
      );

      if (exists) {
        // Produto já é favorito.
        // Remove da lista.
        state.items = state.items.filter(
          (item) => item.id !== product.id
        );
      } else {
        // Produto ainda não é favorito.
        // Adiciona à lista.
        state.items.push(product);
      }
    },

    /**
     * Carrega os favoritos salvos anteriormente.
     */
    setFavorites: (
      state,
      action: PayloadAction<FavoriteItem[]>
    ) => {
      state.items = action.payload;
    },

    /**
     * Remove todos os favoritos.
     */
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

/**
 * Exporta as ações que poderão ser utilizadas
 * pelos componentes e hooks.
 */
export const {
  toggleFavorite,
  setFavorites,
  clearFavorites,
} = favoritesSlice.actions;

/**
 * Exporta o reducer do slice.
 */
export default favoritesSlice.reducer;