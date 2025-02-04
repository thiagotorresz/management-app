import { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const servicos = [
  { id: 1, nome: "SPA", preco: 250 },
  { id: 2, nome: "MANUTENÇÃO", preco: 150 },
  { id: 3, nome: "COFFE-BREAK", preco: 100 },
  { id: 4, nome: "PIQUENIQUE", preco: 120 },
  { id: 5, nome: "CAMAREIRA", preco: 80 },
  { id: 6, nome: "LAVANDERIA", preco: 50 },
  { id: 7, nome: "SERVIÇO DE GARÇOM E CHEF", preco: 300 },
  { id: 8, nome: "CHURRASQUEIRO", preco: 200 },
];

export default function Servicos() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Quando o usuário escolhe uma data
  const onChangeDate = (event, selected) => {
    setShowDatePicker(false);
    if (selected) {
      setSelectedDate(selected);
    }
  };

  // Quando o usuário escolhe um horário
  const onChangeTime = (event, selected) => {
    setShowTimePicker(false);
    if (selected) {
      setSelectedTime(selected);
    }
  };

  // Quando o usuário agenda o serviço
  const handleAgendar = () => {
    if (!selectedService) {
      alert("Escolha um serviço antes de agendar!");
      return;
    }
    alert(
      `Serviço "${selectedService.nome}" agendado para ${selectedDate.toLocaleDateString()} às ${selectedTime.toLocaleTimeString()}!`
    );
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-xl font-bold mb-4 text-center">Serviços Extras</Text>

      {/* Lista de Serviços */}
      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`p-4 mb-2 bg-white rounded-lg border ${
              selectedService?.id === item.id ? "border-blue-500" : "border-gray-300"
            }`}
            onPress={() => setSelectedService(item)}
          >
            <Text className="text-lg font-semibold">{item.nome}</Text>
            <Text className="text-gray-500">R$ {item.preco.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Escolher Data */}
      <TouchableOpacity
        className="p-4 bg-blue-500 rounded-lg mt-4"
        onPress={() => setShowDatePicker(true)}
      >
        <Text className="text-white text-center font-bold">
          Escolher Data: {selectedDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="calendar"
          onChange={onChangeDate}
        />
      )}

      {/* Escolher Horário */}
      <TouchableOpacity
        className="p-4 bg-blue-500 rounded-lg mt-4"
        onPress={() => setShowTimePicker(true)}
      >
        <Text className="text-white text-center font-bold">
          Escolher Horário: {selectedTime.toLocaleTimeString()}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="clock"
          onChange={onChangeTime}
        />
      )}

      {/* Botão de Agendar */}
      <TouchableOpacity
        className="p-4 bg-green-500 rounded-lg mt-4"
        onPress={handleAgendar}
      >
        <Text className="text-white text-center font-bold">Agendar Serviço</Text>
      </TouchableOpacity>
    </View>
  );
}
