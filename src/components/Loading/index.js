import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { green, blue } from "../../colours";

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: green,
      }}
    >
      <Text style={{ color: blue }}>Niles: </Text>
      <Text style={{ color: blue }}>"Going as fast as I can.."</Text>
      <ActivityIndicator size="large" color={blue} />
    </View>
  );
}
