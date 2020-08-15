import React from "react";
import { Text, View } from "react-native";

export default function RecipeDetails({ route, navigation }) {
  console.log("what is in details route", route);
  const props = route.params;

  console.log("what is in props?", props);
  return (
    <View>
      <Text>Hello detailts</Text>
    </View>
  );
}
