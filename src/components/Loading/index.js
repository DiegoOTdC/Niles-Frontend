import React from "react";
import { Text, View, ActivityIndicator } from "react-native";

export default function Loading() {
  const color = "#b3d89cff";
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#5d3a00ff",
      }}
    >
      <Text style={{ color: color }}>Niles: </Text>
      <Text style={{ color: color }}>"Going as fast as I can.."</Text>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
}
