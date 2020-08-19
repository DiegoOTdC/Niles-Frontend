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
        style={{ width: 377, height: 480 }}
        source={require("../../images/trialGif.gif")}
      />
    </View>
  );
}
