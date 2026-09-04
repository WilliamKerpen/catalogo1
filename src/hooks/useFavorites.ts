import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  toggleFavorite as toggleFavoriteAction,
  setFavorites,
} from "../redux/slices/favoritesSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../redux/hooks";

export default function useFavorites() {
  const dispatch = useAppDispatch();

  // Pega os favoritos diretamente do Redux
  const favorites = useAppSelector(
    (state) => state.favorites.items
  );

  // Carrega os favoritos salvos quando o hook é iniciado
  useEffect(() => {
    async function loadSavedFavorites() {
      try {
        const saved = await AsyncStorage.getItem("favorites");

        if (saved) {
          const parsed = JSON.parse(saved);

          dispatch(setFavorites(parsed));
        }
      } catch (error) {
        console.log(
          "Erro ao carregar favoritos:",
          error
        );
      }
    }

    loadSavedFavorites();
  }, [dispatch]);

  // Salva automaticamente sempre que os favoritos mudarem
  useEffect(() => {
    async function saveFavorites() {
      try {
        await AsyncStorage.setItem(
          "favorites",
          JSON.stringify(favorites)
        );
      } catch (error) {
        console.log(
          "Erro ao salvar favoritos:",
          error
        );
      }
    }

    saveFavorites();
  }, [favorites]);

  // Adiciona ou remove um favorito
  function toggleFavorite(product: any) {
    dispatch(
      toggleFavoriteAction({
        ...product,
      })
    );
  }

  // Verifica se determinado produto está nos favoritos
  function isFavorite(id: number) {
    return favorites.some(
      (favorite) => favorite.id === id
    );
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}

