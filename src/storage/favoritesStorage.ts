import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@favorites";

export async function saveFavorites(favorites) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(favorites));
  } catch (error) {
    console.log("Erro ao salvar favoritos:", error);
  }
}

export async function loadFavorites() {
  try {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Erro ao carregar favoritos:", error);
    return [];
  }
}
