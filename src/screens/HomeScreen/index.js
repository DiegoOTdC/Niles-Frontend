import React from "react";
import { View } from "react-native";
import HomeButton from "../../components/HomeButton";

import { AppLoading } from "expo";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { Alata_400Regular } from "@expo-google-fonts/alata";
import { AlfaSlabOne_400Regular } from "@expo-google-fonts/alfa-slab-one";

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Inter_900Black,
    Alata_400Regular,
    AlfaSlabOne_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <HomeButton
          style={{ justifyContent: "top" }}
          title="Scan Image"
          onPress={() => navigation.navigate("Camera")}
          backgroundColor="#b3d89cff"
          color="#3b7080ff"
          font="AlfaSlabOne_400Regular"
        />
        <HomeButton
          style={{ justifyContent: "top" }}
          title="Scan Barcode"
          onPress={() => navigation.navigate("BarcodeScanner")}
          backgroundColor="#3b7080ff"
          color="#b3d89cff"
          font="AlfaSlabOne_400Regular"
        />
      </View>
    );
  }
}
