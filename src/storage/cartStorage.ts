import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@cart";

export async function saveCart(cart) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(cart));
  } catch (error) {
    console.log("Erro ao salvar carrinho:", error);
  }
}

export async function loadCart() {
  try {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Erro ao carregar carrinho:", error);
    return [];
  }
}
