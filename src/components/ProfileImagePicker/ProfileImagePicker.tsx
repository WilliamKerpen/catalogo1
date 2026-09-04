import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ProfileImagePicker({ onChange, initialImage }) {
  const [image, setImage] = useState(initialImage);

  useEffect(() => {
    setImage(initialImage);
  }, [initialImage]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      onChange(uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      alert("Permissão da câmera negada");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      onChange(uri);
    }
  };

  return (
    <View style={{ alignItems: "center", marginBottom: 20 }}>
      <Image
        source={
          image
            ? { uri: image }
            : require("../../../assets/images/default-profile.png")
        }
        style={{ width: 120, height: 120, borderRadius: 60 }}
      />

      <TouchableOpacity onPress={pickImage}>
        <Text style={{ color: "#ccc", marginTop: 10 }}>Escolher da galeria</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={takePhoto}>
        <Text style={{ color: "#ccc", marginTop: 10 }}>Tirar foto</Text>
      </TouchableOpacity>
    </View>
  );
}
