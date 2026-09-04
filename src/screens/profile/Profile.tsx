import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserService } from "../../database/userService";

export default function Profile({ navigation }) {
  const [user, setUser] = useState(null);
  const { getUserById } = useUserService();

  useEffect(() => {
    async function loadUser() {
      const data = await AsyncStorage.getItem("user");
      if (!data) return;

      const parsed = JSON.parse(data);

      // Visitante  é detectado apenas pela ausência de ID
      if (!parsed.id) {
        setUser(parsed);
        return;
      }

      // Usuário real → buscar no banco
      const result = await getUserById(parsed.id);

      if (result.ok) {
        setUser(result.user);
      } else {
        // fallback: usa dados do AsyncStorage
        setUser(parsed);
      }
    }

    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>Carregando...</Text>
      </View>
    );
  }

  const isVisitante = !user.id;

  return (
    <View style={styles.container}>
      <TopBar />

      <View style={styles.content}>
        <Image
          source={
            user.foto
              ? { uri: user.foto }
              : require("../../../assets/images/default-profile.png")
          }
          style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 20 }}
        />

        <Text style={styles.name}>{user.nome}</Text>

        {isVisitante ? (
          <>
            <Text style={{ color: "#ccc", marginBottom: 20 }}>
              Você está usando o app como visitante.
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.buttonText}>Criar Conta</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.buttonText}>Editar Perfil</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
