import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    paddingTop: 70,
    paddingHorizontal: 15,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  categoryButton: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
  },

  categoryButtonActive: {
    backgroundColor: "#e50914",
  },

  categoryText: {
    color: "#fff",
    fontSize: 14,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },

  titleProduct: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  price: {
    color: "#e50914",
    marginTop: 4,
    fontSize: 14,
  },

  header: {
    width: "100%",          // garante que o FlatList horizontal funcione
    backgroundColor: "#0d0d0d",
    paddingBottom: 10,
    paddingTop: 10,
  },
});
