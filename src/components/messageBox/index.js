import React from "react";
import { useSelector } from "react-redux";
import { selectMessage } from "../../store/appState/selectors";
import { View, Text, ActivityIndicator } from "react-native";
import { useFonts, Alata_400Regular } from "@expo-google-fonts/alata";
import { red, green, blue } from "../../colours";

export default function MessageBox() {
  const message = useSelector(selectMessage);
  const showMessage = message !== null;
  if (!showMessage) return null;

  const [fontsLoaded] = useFonts({
    Alata_400Regular,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  const backgroundColor = () => {
    if (message.variant === "success") {
      return green;
    }

    if (message.variant === "danger") {
      return red;
    }

    if (message.variant === "warning") {
      return blue;
    }
  };

  const color = () => {
    if (showMessage.variant === "success") {
      return blue;
    }

    if (showMessage.variant === "danger") {
      return green;
    }

    if (showMessage.variant === "warning") {
      return red;
    }
  };

  return (
    <View
      style={{
        flex: 0.1,
        height: 10,
        justifyContent: "center",
        backgroundColor: { backgroundColor },
      }}
    >
      <Text
        numberOfLines={2}
        style={{
          textAlign: "center",
          fontFamily: "Alata_400Regular",
          color: { color },
          fontSize: 20,
        }}
      >
        {showMessage.text}
      </Text>
    </View>
  );
}
