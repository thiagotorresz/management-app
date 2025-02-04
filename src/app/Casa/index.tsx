import { View, Text, Image } from "react-native";
import { useState } from "react";
import { Calendar } from "react-native-calendars";

export default function Casa() {
  const [selectedDates, setSelectedDates] = useState({});

  const handleDayPress = (day) => {
    setSelectedDates((prev) => ({
      ...prev,
      [day.dateString]: {
        selected: !prev[day.dateString]?.selected,
        selectedColor: "red",
      },
    }));
  };

  return (
    <View className="flex-1 p-4">
      {/* Imagem da Casa */}
      <Image
        source={{ uri: "https://villagecasadecampo.com.br/img/plantas/foto_suite_4.jpg" }}
        className="w-full h-48 rounded-lg"
        resizeMode="cover"
      />

      {/* Nome e Número da Casa */}
      <Text className="text-xl font-bold mt-4 text-center">Casa #101 - Beira Mar</Text>

      {/* Calendário de Disponibilidade */}
      <View className="mt-4">
        <Calendar
          onDayPress={handleDayPress}
          markedDates={selectedDates}
          theme={{
            selectedDayBackgroundColor: "red",
            todayTextColor: "blue",
          }}
        />
      </View>
    </View>
  );
}
