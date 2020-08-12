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
          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Text>Is the picture clear?</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              justifyContent: "center",
              justifyContent: "space-around",
            }}
          >
            <Button
              title="TRY AGAIN"
              onPress={() => navigation.navigate("Camera")}
            />
            <Button
              title="NILES FETCH RECIPES!"
              onPress={() => navigation.navigate("Recipes", { imageUri })}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
