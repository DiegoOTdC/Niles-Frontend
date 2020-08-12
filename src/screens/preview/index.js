import React from "react";
import { Text, View, ImageBackground, Button } from "react-native";

export default function index({ route, navigation }) {
  console.log("route", route);
  const imageUri = route.params.imageUri;
  console.log("imageURI", imageUri);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
        source={{ uri: imageUri }}
      >
        <View
          style={{
            width: "100%",
            height: "10%",
            backgroundColor: "white",
          }}
        >
          <Text style={{ alignSelf: "center" }}>
            Is the picture clear enough?
          </Text>
          <Button
            style={{ width: "50%" }}
            title="TRY AGAIN"
            onPress={() => navigation.navigate("Camera")}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
