import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserService } from "../../database/userService";
import ProfileImagePicker from "../../components/ProfileImagePicker/ProfileImagePicker";

export default function EditProfile({ navigation }) {
  const [user, setUser] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState(null);

  const { getUserById, atualizarUsuario } = useUserService();

  useEffect(() => {
    async function loadUser() {
      const data = await AsyncStorage.getItem("user");
      if (!data) return;

      const parsed = JSON.parse(data);

      if (parsed.visitante === 1) {
        setUser(parsed);
        return;
      }

      const result = await getUserById(parsed.id);

      if (result.ok) {
        const u = result.user;
        setUser(u);
        setNome(u.nome);
        setEmail(u.email);
        setFoto(u.foto);
      } else {
        setUser(parsed);
      }
    }

    loadUser();
  }, []);

  const handleSave = async () => {
    if (!nome || !email) {
      alert("Preencha todos os campos");
      return;
    }

    const result = await atualizarUsuario(user.id, nome, email, foto);

    if (result.ok) {
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ ...user, nome, email, foto })
      );

      alert("Perfil atualizado!");
      navigation.goBack();
    } else {
      alert("Erro ao atualizar perfil");
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>Carregando...</Text>
      </View>
    );
  }

  if (user.visitante === 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Visitante</Text>
        <Text style={{ color: "#ccc", marginBottom: 20 }}>
          Visitantes não podem editar perfil.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <ProfileImagePicker onChange={setFoto} initialImage={foto} />

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#777"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
