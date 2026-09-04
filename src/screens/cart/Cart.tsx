import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import TopBar from "../../components/TopBar/TopBar";
import useCart from "../../hooks/useCart";
import styles from "./Styles";

export default function Cart({ navigation }) {
  // Load cart actions and items / Carrega ações e itens do carrinho
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();

  // Calculate total price / Calcula o preço total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <TopBar />

      {/* Cart title / Título do carrinho */}
      <Text style={styles.title}>Carrinho</Text>

      {/* Cart list / Lista do carrinho */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            
            {/* Product image / Imagem do produto */}
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.itemImage}
            />

            {/* Product info / Informações do produto */}
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>€ {item.price}</Text>

              {/* Quantity controls / Controle de quantidade */}
              <View style={styles.quantityRow}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => decreaseQuantity(item.id)}
                >
                  <Text style={styles.quantityButtonText}>−</Text>
                </TouchableOpacity>

                <Text style={styles.quantityText}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => increaseQuantity(item.id)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Remove item / Remover item */}
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromCart(item.id)}
            >
              <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Total price / Preço total */}
      <Text style={styles.totalText}>
        Total: € {total.toFixed(2)}
      </Text>

      {/* Clear cart button / Botão limpar carrinho */}
      <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
        <Text style={styles.clearButtonText}>Limpar Carrinho</Text>
      </TouchableOpacity>
    </View>
  );
}
