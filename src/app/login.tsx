import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Modal, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const { isAuthenticated, login } = useAuth();
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(true); // Começa visível
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      setCpf(""); // Limpa os campos ao sair
      setSenha("");
      setIsModalVisible(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      setIsModalVisible(false);
      router.replace("/"); // Redireciona para a home
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    const success = await login(cpf, senha);
    if (!success) {
      Alert.alert("Erro", "CPF ou senha incorretos.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-green-900">
      <Text className="text-xl font-bold">Tela de Login</Text>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-gray-200 p-6 rounded-2xl w-80">
            <Text className="text-lg font-bold mb-4">Faça o Login</Text>
            <Text className="text-sm mb-1">CPF:</Text>
            <TextInput
              placeholder="CPF"
              value={cpf}
              onChangeText={setCpf}
              keyboardType="numeric"
              className="border p-2 rounded mb-3"
            />
            <Text className="text-sm mb-1">Senha:</Text>
            <TextInput
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              className="border p-2 rounded mb-3"
            />
            <Button title="Entrar" onPress={handleLogin} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
