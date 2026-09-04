import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
    marginLeft: 15,
  },

  itemCard: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },

  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },

  itemInfo: {
    flex: 1,
  },

  itemTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },

  itemPrice: {
    color: "#e50914",
    fontSize: 15,
    fontWeight: "bold",
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  quantityButton: {
    paddingHorizontal: 10,
  },

  quantityButtonText: {
    color: "#fff",
    fontSize: 22,
  },

  quantityText: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 10,
  },

  removeButton: {
    padding: 10,
  },

  removeButtonText: {
    color: "#e50914",
    fontSize: 15,
  },

  totalText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    margin: 15,
  },

  clearButton: {
    backgroundColor: "#e50914",
    paddingVertical: 15,
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  clearButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
