import React from "react";
import { Text, View, Button } from "react-native";
import HomeButton from "../../components/HomeButton";

export default function HomeScreen() {
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
        onPress=""
        backgroundColor="#b3d89cff"
      />

      <HomeButton
        style={{ justifyContent: "top" }}
        title="Scan Barcode"
        onPress=""
        backgroundColor="#3b7080ff"
      />
    </View>
  );
}
