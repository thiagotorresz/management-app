import { View, Text, Image, TouchableOpacity } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";

export default function Conta() {
  const { logout } = useAuth();
  const router = useRouter();

  const usuario = {
    nome: "Thiago Torres",
    cpf: "123.456.789-00",
    dataNascimento: "15/08/1990",
    endereco: "Rua Exemplo, 123 - Centro, Jaboticatubas - MG",
    email: "thiagoa@email.com",
    telefone: "(31) 98765-4321",
    contrato: "Contrato Assinado em: 05/01/2024",
    fotoPerfil: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-JF6BPkONfFGmWL8C5kx2teKorf9SeMb5dA&s",
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">
      {/* Foto de Perfil */}
      <View className="items-center mb-4">
        <Image
          source={{ uri: usuario.fotoPerfil }}
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
        <Text className="text-xl font-bold mt-2">{usuario.nome}</Text>
      </View>

      {/* Informações do Usuário */}
      <View className="bg-white p-4 rounded-lg shadow">
        <Text className="text-gray-700 font-semibold">CPF:</Text>
        <Text className="text-lg mb-2">{usuario.cpf}</Text>

        <Text className="text-gray-700 font-semibold">Data de Nascimento:</Text>
        <Text className="text-lg mb-2">{usuario.dataNascimento}</Text>

        <Text className="text-gray-700 font-semibold">Endereço:</Text>
        <Text className="text-lg mb-2">{usuario.endereco}</Text>

        <Text className="text-gray-700 font-semibold">E-mail:</Text>
        <Text className="text-lg mb-2">{usuario.email}</Text>

        <Text className="text-gray-700 font-semibold">Telefone:</Text>
        <Text className="text-lg mb-2">{usuario.telefone}</Text>

        <Text className="text-gray-700 font-semibold">Contrato:</Text>
        <Text className="text-lg mb-2">{usuario.contrato}</Text>
      </View>

      {/* Botão para Editar Perfil */}
      <TouchableOpacity className="mt-6 p-4 bg-blue-500 rounded-lg">
        <Text className="text-white text-center font-bold">Editar Perfil</Text>
      </TouchableOpacity>

      {/* Botão de Logout */}
      <TouchableOpacity 
        className="mt-4 p-4 bg-red-500 rounded-lg" 
        onPress={handleLogout}
      >
        <Text className="text-white text-center font-bold">Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
