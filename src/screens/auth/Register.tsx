import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserService } from "../../database/userService";
import ProfileImagePicker from "../../components/ProfileImagePicker/ProfileImagePicker";
import { gerarHash } from "../../utils/hash"; // necessário para buscar o usuário recém cadastrado
import { useSQLiteContext } from "expo-sqlite"; // necessário para buscar o usuário após cadastro

export default function Register({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [foto, setFoto] = useState(null);

  const { cadastrarUsuario } = useUserService();
  const db = useSQLiteContext(); // usado para buscar o usuário recém cadastrado

  async function handleRegister() {
    if (!nome || !email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    const result = await cadastrarUsuario(nome, email, senha, foto);

    if (result.error === "EMAIL_DUPLICADO") {
      alert("Este email já está cadastrado.");
      return;
    }

    if (!result.ok) {
      alert("Erro ao cadastrar usuário");
      return;
    }

    alert("Usuário cadastrado com sucesso!");

    // Buscar o usuário recém cadastrado para logar automaticamente
    const senhaHash = gerarHash(senha);

    const rows = await db.getAllAsync(
      "SELECT * FROM users WHERE email = ? AND senha = ?",
      [email, senhaHash]
    );

    if (rows.length === 0) {
      alert("Erro ao carregar usuário após cadastro.");
      return;
    }

    const user = rows[0];

    await AsyncStorage.setItem("user", JSON.stringify(user));

    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Criar Conta</Text>

          <ProfileImagePicker onChange={setFoto} initialImage={null} />

          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#777"
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#777"
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#777"
            secureTextEntry
            onChangeText={setSenha}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Já tenho conta</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
