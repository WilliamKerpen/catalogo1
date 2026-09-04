import AsyncStorage from "@react-native-async-storage/async-storage";

/*
 * Chave utilizada para guardar os dados da sessão atual.
 *
 * Quando temos um usuário logado, essa chave contém
 * os dados desse usuário.
 *
 * Quando não existe usuário, consideramos que a pessoa
 * está utilizando o aplicativo como visitante.
 */
const USER_KEY = "user";

/*
 * Retorna o usuário atualmente armazenado.
 *
 * Se não existir usuário, retorna null.
 */
export async function getCurrentUser() {
  try {
    const data = await AsyncStorage.getItem(USER_KEY);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  } catch (error) {
    console.log("Erro ao recuperar usuário atual:", error);

    return null;
  }
}

/*
 * Retorna o identificador que será utilizado
 * para salvar carrinho e favoritos.
 *
 * Usuário cadastrado:
 *
 *     cart_15
 *     favorites_15
 *
 * Visitante:
 *
 *     cart_guest
 *     favorites_guest
 */
export async function getStorageUserId() {
  const user = await getCurrentUser();

  /*
   * Usuário cadastrado possui id no banco.
   */
  if (user && user.id) {
    return String(user.id);
  }

  /*
   * Quando não existe usuário logado,
   * utilizamos o identificador "guest".
   */
  return "guest";
}

/*
 * Monta a chave utilizada para salvar o carrinho.
 *
 * Exemplos:
 *
 * cart_guest
 * cart_15
 * cart_27
 */
export function getCartStorageKey(userId) {
  return `cart_${userId}`;
}

/*
 * Monta a chave utilizada para salvar os favoritos.
 *
 * Exemplos:
 *
 * favorites_guest
 * favorites_15
 * favorites_27
 */
export function getFavoritesStorageKey(userId) {
  return `favorites_${userId}`;
}