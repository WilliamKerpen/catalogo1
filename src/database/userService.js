// Hook do Expo SQLite para acessar o banco criado pelo SQLiteProvider
import { useSQLiteContext } from "expo-sqlite";

// Função utilitária para gerar hash da senha
import { gerarHash } from "../utils/hash";

/**
 * Este hook encapsula todas as operações relacionadas ao usuário.
 * Ele só funciona dentro de componentes que estão dentro do <SQLiteProvider>.
 */
export function useUserService() {
  // Obtém a instância do banco fornecida pelo SQLiteProvider
  const db = useSQLiteContext();

  /**
   * Cadastrar usuário normal
   * - Gera hash da senha
   * - Verifica se o email já existe
   * - Insere no banco
   */
  async function cadastrarUsuario(nome, email, senha, foto) {
    const senhaHash = gerarHash(senha);

    try {
      // Verifica se já existe um usuário com o mesmo email
      const existente = await db.getFirstAsync(
        "SELECT id FROM users WHERE email = ?",
        [email]
      );

      if (existente) {
        return { ok: false, error: "EMAIL_DUPLICADO" };
      }

      // Insere o novo usuário
      await db.runAsync(
        "INSERT INTO users (nome, email, senha, foto) VALUES (?, ?, ?, ?)",
        [nome, email, senhaHash, foto]
      );

      return { ok: true };
    } catch (error) {
      console.log("Erro ao cadastrar usuário:", error);

      return {
        ok: false,
        error,
      };
    }
  }

  /**
   * Login do usuário
   * - Busca usuário pelo email e senha
   * - Retorna os dados do usuário encontrado
   */
  async function loginUsuario(email, senha) {
    const senhaHash = gerarHash(senha);

    try {
      // Busca usuário com email e senha
      const rows = await db.getAllAsync(
        "SELECT * FROM users WHERE email = ? AND senha = ?",
        [email, senhaHash]
      );

      if (rows.length > 0) {
        return {
          ok: true,
          user: rows[0],
        };
      }

      return {
        ok: false,
        user: null,
      };
    } catch (error) {
      console.log("Erro no login:", error);

      return {
        ok: false,
        user: null,
      };
    }
  }

  /**
   * Buscar usuário pelo ID
   *
   * Essa função é utilizada pelo Profile.
   */
  async function getUserById(id) {
    try {
      const user = await db.getFirstAsync(
        "SELECT * FROM users WHERE id = ?",
        [id]
      );

      if (user) {
        return {
          ok: true,
          user,
        };
      }

      return {
        ok: false,
        user: null,
      };
    } catch (error) {
      console.log("Erro ao buscar usuário pelo ID:", error);

      return {
        ok: false,
        user: null,
        error,
      };
    }
  }

  /**
   * Atualizar dados do usuário
   * - Atualiza nome, email e foto
   */
  async function atualizarUsuario(id, nome, email, foto) {
    try {
      await db.runAsync(
        "UPDATE users SET nome = ?, email = ?, foto = ? WHERE id = ?",
        [nome, email, foto, id]
      );

      return {
        ok: true,
      };
    } catch (error) {
      console.log("Erro ao atualizar usuário:", error);

      return {
        ok: false,
      };
    }
  }

  // Retorna todas as funções do serviço
  return {
    cadastrarUsuario,
    loginUsuario,
    getUserById,
    atualizarUsuario,
  };
}