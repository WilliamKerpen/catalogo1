import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import styles from "./styles";
import TopBar from "../../components/TopBar/TopBar";
import useFavorites from "../../hooks/useFavorites";
import { FontAwesome } from "@expo/vector-icons";
import useCart from "../../hooks/useCart";



export default function ProductDetails({ route }) {
  const { id } = route.params;

  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { favorites } = useFavorites();
  const { cart } = useCart();

  

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProduto(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContent}>
        <ActivityIndicator size="large" color="#e50914" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopBar favoritesCount={favorites.length} cartCount={cart.length} />
    
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 30 }}>
        
        {/* Imagem principal */}
        <View style={{ position: "relative" }}>
          <Image source={{ uri: produto.thumbnail }} style={styles.image} />

          {/* Botão de favorito */}
          <TouchableOpacity
            onPress={() => toggleFavorite(produto)}
            style={styles.favoriteButton}
          >
            <FontAwesome
              name={isFavorite(produto.id) ? "heart" : "heart-o"}
              size={30}
              color="#e50914"
            />
          </TouchableOpacity>
        </View>

        {/* Título */}
        <Text style={styles.title}>{produto.title}</Text>

        {/* Preço */}
        <Text style={styles.price}>€ {produto.price}</Text>

        {/* Desconto */}
        {produto.discountPercentage > 0 && (
          <Text style={styles.discount}>
            Desconto: {produto.discountPercentage}%
          </Text>
        )}

        {/* Botões de ação */}
        <View style={styles.actionsRow}>
          {/* Adicionar ao carrinho */}
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => addToCart(produto)}
          >
            <FontAwesome name="shopping-cart" size={26} color="#fff" />
            <Text style={styles.cartButtonText}>Adicionar ao carrinho</Text>
          </TouchableOpacity>
        </View>

        {/* Descrição */}
        <Text style={styles.description}>{produto.description}</Text>

      </ScrollView>
    </View>
  );
}
