import React from "react";
import { Button, TouchableWithoutFeedback, View, Text } from "react-native";

export default function HomeButton({
  title,
  onPress,
  backgroundColor,
  color,
  font,
}) {
  return (
    <TouchableWithoutFeedback
      onPressIn={(e) => {
        console.log("user pressed my button");
      }}
      onPressOut={(e) => {
        console.log("user released my button");
      }}
      onPress={onPress}
    >
      <View
        style={{
          height: "50%",
          width: "100%",

          backgroundColor: backgroundColor,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            top: "40%",
            color: color,
            fontSize: 18,
            fontFamily: font,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
