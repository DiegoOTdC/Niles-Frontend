import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectMessage } from "../../store/appState/selectors";
import { View, Text, ActivityIndicator } from "react-native";
import { useFonts, Alata_400Regular } from "@expo-google-fonts/alata";
import { red, green, blue } from "../../colours";

export default function MessageBox() {
  const message = useSelector(selectMessage);
  const text = message && message.text;
  const variant = message && message.variant;

  const setColor = (variant) => {
    if (variant === "warning") return red;
    if (variant === "success") return blue;
    if (variant === "danger") return green;
  };
  const setBackgroundColor = (variant) => {
    if (variant === "warning") return blue;
    if (variant === "success") return green;
    if (variant === "danger") return red;
  };

  const setFlex = (text) => {
    if (text) return 0.1;
    if (!text) return 0;
  };
  const setHeight = (text) => {
    if (text) return 10;
    if (!text) return 0;
  };

  const [fontsLoaded] = useFonts({
    Alata_400Regular,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <View
      style={{
        flex: setFlex(text),
        height: setHeight(text),
        justifyContent: "center",
        backgroundColor: setBackgroundColor(variant),
      }}
    >
      <Text
        numberOfLines={2}
        style={{
          textAlign: "center",
          fontFamily: "Alata_400Regular",
          color: setColor(variant),
          fontSize: 20,
          paddingHorizontal: 15,
        }}
      >
        {text}
      </Text>
    </View>
  );
}
