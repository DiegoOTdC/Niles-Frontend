import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, ImageBackground, Button } from "react-native";
import { selectRecipes } from "../../store/recipes/selectors";

export default function Recipes({ route, navigation }) {
  const recipes = useSelector(selectRecipes);

  console.log("did the recipes show up?", recipes);
  return (
    <View>
      <Text>Helloooooo Recipessss</Text>
    </View>
  );
}
