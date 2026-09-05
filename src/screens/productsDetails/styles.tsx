import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    paddingHorizontal: 10,
    
  },
  
  content: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    paddingHorizontal: 15,
  },

  loadingContent: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20, // garante que a imagem não fique atrás do TopBar
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  price: {
    color: "#e50914",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  discount: {
    color: "#0f0",
    fontSize: 18,
    marginBottom: 10,
  },

  description: {
    color: "#ccc",
    fontSize: 16,
    marginTop: 10,
    lineHeight: 22,
  },

  // botão de favorito sobre a imagem
  favoriteButton: {
    position: "absolute",
    top: 15,
    right: 15,
    padding: 5,
    zIndex: 10, // garante que o botão fique acima da imagem
  },
  actionsRow: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 20,
  marginBottom: 20,
},

cartButton: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#e50914",
  paddingVertical: 12,
  paddingHorizontal: 15,
  borderRadius: 8,
},

cartButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
  marginLeft: 10,
},

});
