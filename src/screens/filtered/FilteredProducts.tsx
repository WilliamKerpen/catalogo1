import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import styles from "./styles";
import TopBar from "../../components/TopBar/TopBar";

import useFavorites from "../../hooks/useFavorites";
import { FontAwesome } from "@expo/vector-icons";

import useCart from "../../hooks/useCart";


// Categorias disponíveis
const categoriasMen = ["mens-shirts", "mens-shoes", "mens-watches"];
const categoriasWomen = [
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];

export default function FilteredProducts({ route, navigation }) {
  const { type } = route.params;

  // Hook de favoritos
  const { toggleFavorite, isFavorite } = useFavorites();
  // hook carrinho
  const { addToCart } = useCart();

  const { favorites } = useFavorites();
  const { cart } = useCart();



  // Define quais categorias serão exibidas
  const categorias =
    type === "men"
      ? categoriasMen
      : type === "women"
      ? categoriasWomen
      : [...categoriasMen, ...categoriasWomen];

  // Lista completa de produtos carregados
  const [produtos, setProdutos] = useState([]);

  // Lista filtrada (quando o usuário clica em uma categoria)
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);

  // Categoria selecionada no filtro
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  // Carrega TODOS os produtos das categorias automaticamente
  useEffect(() => {
    async function carregarTudo() {
      let listaFinal = [];

      for (const categoria of categorias) {
        try {
          const res = await axios.get(
            `https://dummyjson.com/products/category/${categoria}`
          );
          listaFinal = [...listaFinal, ...res.data.products];
        } catch (err) {
          console.log(err);
        }
      }

      setProdutos(listaFinal);
      setProdutosFiltrados(listaFinal); // mostra tudo inicialmente
    }

    carregarTudo();
  }, []);

  // Quando o usuário seleciona um filtro
  useEffect(() => {
    if (!categoriaSelecionada) {
      setProdutosFiltrados(produtos); // sem filtro → mostra tudo
      return;
    }

    async function filtrarCategoria() {
      try {
        const res = await axios.get(
          `https://dummyjson.com/products/category/${categoriaSelecionada}`
        );
        setProdutosFiltrados(res.data.products);
      } catch (err) {
        console.log(err);
      }
    }

    filtrarCategoria();
  }, [categoriaSelecionada]);

  return (
    <View style={styles.container}>

      <TopBar favoritesCount={favorites.length} cartCount={cart.length} />

      {/* HEADER FIXO */}
      <View style={[styles.header, { width: "100%" }]}>
        <Text style={styles.title}>Categorias</Text>

     <FlatList
  horizontal
  data={categorias}
  keyExtractor={(item) => item}
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{ paddingRight: 20 }} // habilita scroll real
  renderItem={({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        categoriaSelecionada === item && styles.categoryButtonActive,
      ]}
      onPress={() => setCategoriaSelecionada(item)}
    >
      <Text style={styles.categoryText}>
        {item.replace("mens-", "Men ").replace("womens-", "Women ")}
      </Text>
    </TouchableOpacity>
  )}
/>

      </View>

      {/* LISTA DE PRODUTOS */}
      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingTop: 10 }}
        renderItem={({ item }) => (
          <View style={styles.card}>

            {/* Card do produto */}
            <TouchableOpacity
              style={{ flexDirection: "row", flex: 1 }}
              onPress={() =>
                navigation.navigate("ProductDetails", { id: item.id })
              }
            >
              <Image source={{ uri: item.thumbnail }} style={styles.image} />
              <View>
                <Text style={styles.titleProduct}>{item.title}</Text>
                <Text style={styles.price}>€ {item.price}</Text>
              </View>
            </TouchableOpacity>

            {/* Ícone de favorito */}
            <TouchableOpacity
              onPress={() => toggleFavorite(item)}
              style={{ paddingHorizontal: 10 }}
            >
              <FontAwesome
                name={isFavorite(item.id) ? "heart" : "heart-o"}
                size={24}
                color="#e50914"
              />
            </TouchableOpacity>

            {/* Ícone de carrinho */}
              <TouchableOpacity
                  onPress={() => addToCart(item)}
                  style={{ paddingHorizontal: 10 }}
                >
                  <FontAwesome name="shopping-cart" size={24} color="#fff" />
              </TouchableOpacity>

          </View>
        )}
      />
    </View>
  );
}
