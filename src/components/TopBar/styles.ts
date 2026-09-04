import { StyleSheet } from "react-native";

export default StyleSheet.create({
  /**
   * Área segura do iPhone.
   * Não deve ser absoluta.
   */
  safeArea: {
    backgroundColor: "#0d0d0d",
  },

  /**
   * Container absoluto do TopBar.
   * Fica sempre abaixo da área segura.
   */
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,

    height: 60,
    backgroundColor: "#0d0d0d",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 20,
    zIndex: 999,
  },

  logo: {
    width: 120,
    height: 40,
    resizeMode: "contain",
  },

  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  /**
   * Badge usado tanto para favoritos quanto para carrinho.
   */
  badge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "#e50914",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
