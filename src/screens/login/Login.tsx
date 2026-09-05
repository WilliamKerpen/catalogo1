import React, { useState } from "react";
import {  View, Text, TextInput, TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import styles from "./Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserService } from "../../database/userService";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { loginUsuario } = useUserService();

  // Função de login normal
  const handleLogin = async () => {
    if (!email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    const result = await loginUsuario(email, senha);

    if (result.ok) {
      await AsyncStorage.setItem("user", JSON.stringify(result.user));

      // Reset para evitar voltar para login
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    } else {
      alert("Email ou senha incorretos");
    }
  };

  // Login como visitante
  const entrarComoVisitante = async () => {
    const visitante = {
      id: null,
      nome: "Visitante",
      email: null,
      foto: null,
      visitante: 1,
    };

    await AsyncStorage.setItem("user", JSON.stringify(visitante));

    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  };

  return (
    // Faz o teclado empurrar a tela no iOS
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Fecha o teclado ao tocar fora dos inputs */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>

          {/* LOGO DO APP */}
          <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.logo}
          />

          <Text style={styles.title}>Bem Vindo ao seu App de Catálogo !</Text>

          {/* INPUT EMAIL */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#777"
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {/* INPUT SENHA */}
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#777"
            secureTextEntry
            onChangeText={setSenha}
          />

          {/* BOTÃO LOGIN */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          {/* LINK CRIAR CONTA */}
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>Criar Conta</Text>
          </TouchableOpacity>

          {/* LINK VISITANTE */}
          <TouchableOpacity onPress={entrarComoVisitante}>
            <Text style={styles.link}>Entrar como Visitante</Text>
          </TouchableOpacity>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
