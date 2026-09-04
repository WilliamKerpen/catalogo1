import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import TopBar from "../../components/TopBar/TopBar";

const Tab = createMaterialTopTabNavigator();

// Categorias
const categoriasMasculinas = ["mens-shirts", "mens-shoes", "mens-watches"];
const categoriasFemininas = [
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];

// Componente que carrega produtos por categoria
function ListaCategoria({ categoria }) {
  const navigation = useNavigation();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/category/${categoria}`)
      .then((res) => setProdutos(res.data.products))
      .catch((err) => console.log(err));
  }, [categoria]);

  return (
    <FlatList
      data={produtos}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 10 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        >
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
          <View style={{ flex: 1 }}>
           <TopBar />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>€ {item.price}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

export default function Products() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#111" },
        tabBarActiveTintColor: "#e50914",
        tabBarInactiveTintColor: "#aaa",
        tabBarIndicatorStyle: { backgroundColor: "#e50914" },
        tabBarScrollEnabled: true,
      }}
    >
      {/* Masculino */}
      {categoriasMasculinas.map((cat) => (
        <Tab.Screen
          key={cat}
          name={cat}
          children={() => <ListaCategoria categoria={cat} />}
          options={{ title: cat.replace("mens-", "Men ") }}
        />
      ))}

      {/* Feminino */}
      {categoriasFemininas.map((cat) => (
        <Tab.Screen
          key={cat}
          name={cat}
          children={() => <ListaCategoria categoria={cat} />}
          options={{ title: cat.replace("womens-", "Women ") }}
        />
      ))}
    </Tab.Navigator>
  );
}
