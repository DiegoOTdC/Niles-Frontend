import React from "react";
import { View, Image } from "react-native";
import { green } from "../../colours";

export default function Loading(prop) {
  const { color } = prop;

  const backgroundColor = color || green;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor,
      }}
    >
      <Image
        style={{ width: 400, height: 400 }}
        source={require("../../images/scanFoodLoading.gif")}
      />
    </View>
  );
}
