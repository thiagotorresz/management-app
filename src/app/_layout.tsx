import "../styles/global.css";
import { Drawer } from "expo-router/drawer";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useRouter, Slot } from "expo-router";
import { useEffect, useState } from "react";
import { Providers } from "../context/providers";

export default function Layout() {
  return (
    <Providers> {/* Garante que AuthProvider está ativo no app */}
      <ProtectedLayout />
    </Providers>
  );
}

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Marca como montado após o primeiro render

    if (isMounted && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isMounted]);

  if (!isMounted) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Drawer screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="index" options={{ title: "Home" }} />
      <Drawer.Screen name="Casa/index" options={{ title: "Minha Casa" }} />
      <Drawer.Screen name="Faturas/index" options={{ title: "Faturas" }} />
      <Drawer.Screen name="Restaurantes/index" options={{ title: "Restaurantes" }} />
      <Drawer.Screen name="Servicos/index" options={{ title: "Serviços Extras" }} />
      <Drawer.Screen name="Conta/index" options={{ title: "Minha Conta" }} />
      <Slot /> {/* Garante que o layout está sempre renderizado */}
    </Drawer>
  );
}
