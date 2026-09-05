import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import TopBar from "../../components/TopBar/TopBar";



export default function Home({ navigation }) {

  return (
    <View style={styles.container}>
      {/* Barra superior fixa */}
      <TopBar />

      {/* Conteúdo central da Home */}
      <View style={styles.content}>
        <Text style={styles.title}>O que você está procurando hoje?</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("FilteredProducts", { type: "men" })}
        >
          <Text style={styles.buttonText}>Produtos Masculinos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("FilteredProducts", { type: "women" })}
        >
          <Text style={styles.buttonText}>Produtos Femininos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("FilteredProducts", { type: "all" })}
        >
          <Text style={styles.buttonText}>Ver Tudo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
