import { StyleSheet } from "react-native";

export default StyleSheet.create({
  /**
   * Container geral da tela.
   * Não deve centralizar tudo, pois isso empurra o TopBar para o meio.
   */
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    paddingHorizontal: 20,
    
  },

  /**
   * Área do conteúdo abaixo do TopBar.
   * Aqui sim podemos centralizar verticalmente.
   */
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },

  button: {
    width: "100%",
    backgroundColor: "#e50914",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },

  buttonSecondary: {
    width: "100%",
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
