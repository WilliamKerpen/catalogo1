import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    paddingHorizontal: 15,
  },

  content: {
    marginTop: 40,
    alignItems: "center",
  },

  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 30,
  },

  button: {
    width: "100%",
    backgroundColor: "#333",
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },

  logoutButton: {
    backgroundColor: "#e50914",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
