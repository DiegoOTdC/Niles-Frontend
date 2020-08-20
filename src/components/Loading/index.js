import React from "react";
import { Text, View, ActivityIndicator, Image } from "react-native";
import { green, blue } from "../../colours";

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: green,
      }}
    >
      <Image
        style={{ width: 400, height: 400 }}
        source={require("../../images/scanFoodLoading.gif")}
      />
    </View>
  );
}
