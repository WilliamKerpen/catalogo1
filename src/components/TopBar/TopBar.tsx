import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";
import { useAppSelector } from "../../redux/hooks";

/**
 * Barra superior da aplicação.
 *
 * Os contadores de favoritos e carrinho são obtidos
 * diretamente do Redux.
 *
 * Dessa forma, qualquer alteração nesses estados
 * será refletida automaticamente no TopBar.
 */
export default function TopBar() {
  const navigation = useNavigation();

  // Obtém a lista global de favoritos do Redux
  const favorites = useAppSelector(
    (state) => state.favorites.items
  );

  // Obtém a lista global do carrinho do Redux
  const cart = useAppSelector(
    (state) => state.cart.items
  );

  // Quantidade de favoritos
  const favoritesCount = favorites.length;

  // Quantidade de produtos diferentes no carrinho
  const cartCount = cart.length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Logo que leva para a Home */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* Ícones localizados no lado direito */}
        <View style={styles.iconsContainer}>

          {/* Botão de favoritos com contador */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Favorites")
            }
            style={{ position: "relative" }}
          >
            <FontAwesome
              name="heart"
              size={26}
              color="#fff"
            />

            {/* Exibe o badge somente quando existir favorito */}
            {favoritesCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {favoritesCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Botão do carrinho com contador */}
          <TouchableOpacity
            style={{
              marginLeft: 20,
              position: "relative",
            }}
            onPress={() =>
              navigation.navigate("Cart")
            }
          >
            <FontAwesome
              name="shopping-cart"
              size={26}
              color="#fff"
            />

            {/* Exibe o badge somente quando existir produto */}
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Botão do perfil */}
          <TouchableOpacity
            style={{ marginLeft: 20 }}
            onPress={() =>
              navigation.navigate("Profile")
            }
          >
            <FontAwesome
              name="user"
              size={26}
              color="#fff"
            />
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}
