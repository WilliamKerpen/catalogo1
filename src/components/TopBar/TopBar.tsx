import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * O TopBar volta a receber props:
 * - favoritesCount
 * - cartCount
 *
 * Isso permite que cada tela controle o valor exibido.
 */
export default function TopBar({ favoritesCount = 0, cartCount = 0 }) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Logo que volta para a Home */}
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* Ícones à direita */}
        <View style={styles.iconsContainer}>

          {/* Favoritos com badge */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Favorites")}
            style={{ position: "relative" }}
          >
            <FontAwesome name="heart" size={26} color="#fff" />

            {favoritesCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{favoritesCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Carrinho com badge */}
          <TouchableOpacity
            style={{ marginLeft: 20, position: "relative" }}
            onPress={() => navigation.navigate("Cart")}
          >
            <FontAwesome name="shopping-cart" size={26} color="#fff" />

            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Perfil */}
          <TouchableOpacity
            style={{ marginLeft: 20 }}
            onPress={() => navigation.navigate("Profile")}
          >
            <FontAwesome name="user" size={26} color="#fff" />
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}
