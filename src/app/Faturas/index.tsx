import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useState } from "react";
import moment from "moment";
import { useRouter } from "expo-router";

const fakeInvoices = [
  { id: "1", dueDate: "2025-02-01", amount: 200, status: "open" },
  { id: "2", dueDate: "2025-01-28", amount: 150, status: "paid" },
  { id: "3", dueDate: "2025-01-30", amount: 300, status: "overdue" },
];

const InvoiceItem = ({ invoice }) => {
  const router = useRouter();
  let bgColor = "#D1D5DB"; // cinza
  let borderColor = "#D1D5DB"; // cinza

  if (invoice.status === "paid") {
    bgColor = "#10B981"; // verde
    borderColor = "#10B981"; // verde
  } else if (invoice.status === "overdue") {
    bgColor = "#EF4444"; // vermelho
    borderColor = "#EF4444"; // vermelho
  }

  return (
    <View
      style={{
        padding: 16,
        marginBottom: 8,
        borderLeftWidth: 4,
        borderColor: borderColor,
        backgroundColor: bgColor,
        borderRadius: 8,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{`Fatura #${invoice.id}`}</Text>
      <Text style={{ fontSize: 14, color: "#6B7280" }}>
        {`Vencimento: ${moment(invoice.dueDate).format("DD/MM/YYYY")}`}
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{`R$ ${invoice.amount}`}</Text>

      {/* Botão de Pagar */}
      {invoice.status === "open" && (
        <TouchableOpacity
          onPress={() => router.push(`/Pagamento?invoiceId=${invoice.id}`)} // Certifique-se de que invoice.id está correto
          style={{
            marginTop: 12,
            backgroundColor: "#3B82F6",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Pagar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function Faturas() {
  const [filter, setFilter] = useState("all"); // all, open, paid, overdue
  const [invoices, setInvoices] = useState(fakeInvoices);

  const filterInvoices = (status) => {
    setFilter(status);
    if (status === "all") {
      setInvoices(fakeInvoices);
    } else {
      setInvoices(fakeInvoices.filter((invoice) => invoice.status === status));
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Filtro de Status */}
      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        <TouchableOpacity onPress={() => filterInvoices("all")} style={{ marginRight: 16 }}>
          <Text style={{ color: "#3B82F6" }}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filterInvoices("open")} style={{ marginRight: 16 }}>
          <Text style={{ color: "#3B82F6" }}>Em aberto</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filterInvoices("paid")} style={{ marginRight: 16 }}>
          <Text style={{ color: "#3B82F6" }}>Pagas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filterInvoices("overdue")}>
          <Text style={{ color: "#3B82F6" }}>Vencidas</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Faturas */}
      <FlatList
        data={invoices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <InvoiceItem invoice={item} />}
      />
    </View>
  );
}
