import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  // Função responsável por carregar os favoritos
  async function loadFavorites() {
    try {
      const saved = await AsyncStorage.getItem("favorites");

      if (saved) {
        setFavorites(JSON.parse(saved));
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.log("Erro ao carregar favoritos:", error);
    }
  }

  // Carrega ao iniciar
  useEffect(() => {
    loadFavorites();
  }, []);

  // Salva favoritos
  async function save(newList) {
    try {
      await AsyncStorage.setItem(
        "favorites",
        JSON.stringify(newList)
      );

      // Atualiza imediatamente o estado deste componente
      setFavorites(newList);
    } catch (error) {
      console.log("Erro ao salvar favoritos:", error);
    }
  }

  // Adicionar/remover favorito
  function toggleFavorite(product) {
    const exists = favorites.find(
      (f) => f.id === product.id
    );

    if (exists) {
      const newList = favorites.filter(
        (f) => f.id !== product.id
      );

      save(newList);
      return;
    }

    const newList = [...favorites, product];

    save(newList);
  }

  // Verificar se é favorito
  function isFavorite(id) {
    return favorites.some(
      (f) => f.id === id
    );
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    loadFavorites,
  };
}