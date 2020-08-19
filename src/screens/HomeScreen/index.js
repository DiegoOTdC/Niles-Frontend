import React from "react";
import { View } from "react-native";
import HomeButton from "../../components/HomeButton";
import { AppLoading } from "expo";

import { green, blue } from "../../colours";
import {
  useFonts,
  AlfaSlabOne_400Regular,
} from "@expo-google-fonts/alfa-slab-one";
const alfa = "AlfaSlabOne_400Regular";

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
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
          backgroundColor={green}
          color={blue}
          font={alfa}
        />
        <HomeButton
          style={{ justifyContent: "top" }}
          title="Scan Barcode"
          onPress={() => navigation.navigate("BarcodeScanner")}
          backgroundColor={blue}
          color={green}
          font={alfa}
        />
      </View>
    );
  }
}
