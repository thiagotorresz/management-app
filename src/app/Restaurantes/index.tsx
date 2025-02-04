import { Text, View, ScrollView } from "react-native";
import { Banner } from "../../components/Restaurantes/Banner/banner";
import { Search } from "../../components/Restaurantes/Search/search";
import { Section } from "../../components/Restaurantes/Section/section";
import { TrendingFoods } from "../../components/Restaurantes/Trending";
import { Restaurants } from "../../components/Restaurantes/Restaurants";
import { RestaurantVerticalList } from "../../components/Restaurantes/List/list";

import Constants from "expo-constants";

const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      className="bg-slate-200"
      showsVerticalScrollIndicator={false}>

      <View className="w-full px-4" style={{ marginTop: statusBarHeight + 8 }}>
        <Banner />

        <Search />

        <Section
          name="Comidas em alta"
          size="text-2xl"
          label="Veja mais"
          action={() => console.log("CLICOU NO VEJA MAIS")}
        />

        <TrendingFoods />

        <Section
          name="Famosos no DevFood"
          size="text-xl"
          label="Veja todos"
          action={() => console.log("CLICOU NO VEJA TODOS")}
        />

        <Restaurants />

        <Section
          name="Restaurantes"
          size="text-xl"
          label="Veja todos"
          action={() => console.log("CLICOU NO VEJA TODOS")}
        />

        <RestaurantVerticalList />

      </View>
    </ScrollView>
  );
}