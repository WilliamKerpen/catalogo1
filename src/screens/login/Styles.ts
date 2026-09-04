import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    paddingTop: 70,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  logo: {
    marginTop: 150,
    width: 180,
    height: 80,
    marginBottom: 30,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
  },
  input: {
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    color: "#fff",
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
    width: "100%",
  },
  button: {
    backgroundColor: "#e50914",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#ccc",
    fontSize: 15,
    textAlign: "center",
    marginTop: 20,
  },
});
