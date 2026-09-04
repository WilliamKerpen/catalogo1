import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    backgroundColor: "#0d0d0d",
  },

  container: {
    height: 60,
    backgroundColor: "#0d0d0d",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 20,
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