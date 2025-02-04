import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (cpf: string, senha: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Simulação de usuários no banco de dados
const FAKE_USERS = [
  { cpf: "123456", senha: "000000" },
  { cpf: "98765432100", senha: "123456" },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  const login = async (cpf: string, senha: string): Promise<boolean> => {
    const user = FAKE_USERS.find((u) => u.cpf === cpf && u.senha === senha);
    
    if (user) {
      await AsyncStorage.setItem("userToken", "fake_token");
      setIsAuthenticated(true);
      return true; // Login bem-sucedido
    } else {
      return false; // Falha no login
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
