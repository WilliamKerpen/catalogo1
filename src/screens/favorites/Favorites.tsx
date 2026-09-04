import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import useFavorites from "../../hooks/useFavorites";
import TopBar from "../../components/TopBar/TopBar";

export default function Favorites({ navigation }) {
  // Hook global de favoritos (usa AsyncStorage, não depende do banco)
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  

  return (
    <View style={{ flex: 1, backgroundColor: "#0d0d0d"}}>
      {/* Barra superior fixa */}
      <TopBar favoritesCount={favorites.length}/>

      {/* Título da tela */}
      <Text style={{ color: "#fff", fontSize: 22, margin: 15 }}>
        Favoritos
      </Text>

      {/* Lista de favoritos */}
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#1a1a1a",
              padding: 10,
              margin: 10,
              borderRadius: 10,
              alignItems: "center"
            }}
          >
            {/* Ao clicar no card → abre detalhes do produto */}
            <TouchableOpacity
              style={{ flexDirection: "row", flex: 1 }}
              onPress={() =>
                navigation.navigate("ProductDetails", { id: item.id })
              }
            >
              <Image
                source={{ uri: item.thumbnail }}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 8,
                  marginRight: 12
                }}
              />

              <View>
                <Text style={{ color: "#fff", fontSize: 16 }}>
                  {item.title}
                </Text>
                <Text style={{ color: "#e50914", marginTop: 4 }}>
                  € {item.price}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Botão de favorito para remover da lista */}
            <TouchableOpacity
              onPress={() => toggleFavorite(item)}
              style={{ paddingHorizontal: 10 }}
            >
              <Text style={{ color: "#e50914", fontSize: 22 }}>
                {isFavorite(item.id) ? "♥" : "♡"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
