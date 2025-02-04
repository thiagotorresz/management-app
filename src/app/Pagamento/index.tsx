import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Pagamento() {
  const router = useRouter();
  const { invoiceId } = router.query;

  // Verifique se o invoiceId está presente
  if (!invoiceId) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Invoice ID não foi passado corretamente!</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Tela de Pagamento</Text>
      <Text style={{ fontSize: 18, marginVertical: 20 }}>
        Fatura # {invoiceId}
      </Text>
      <Button title="Confirmar Pagamento" onPress={() => alert("Pagamento Confirmado!")} />
    </View>
  );
}
