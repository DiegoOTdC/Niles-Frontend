import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, ActivityIndicator } from "react-native";
import { useFonts, Alata_400Regular } from "@expo-google-fonts/alata";

export default function MessageBox() {
  const [fontsLoaded] = useFonts({
    Alata_400Regular,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  const message = "useSelector(selectMessage)";
  const showMessage = message !== null;
  if (!showMessage) return null;

  return (
    <View style={{ flex: 0.1, height: 10, justifyContent: "center" }}>
      <Text
        numberOfLines={2}
        style={{
          textAlign: "center",
          fontFamily: "Alata_400Regular",
          fontSize: 20,
        }}
      >
        {message}
      </Text>
    </View>
  );
}
