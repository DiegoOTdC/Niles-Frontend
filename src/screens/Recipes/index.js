import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  ImageBackground,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
import { selectRecipes } from "../../store/recipes/selectors";
import Recipe from "../../components/Recipe";
import { AppLoading } from "expo";

export default function Recipes({ route, navigation }) {
  const recipes = useSelector(selectRecipes);
  console.log("what is recipes?", recipes.length);

  if (!recipes) {
    return <AppLoading />;
  } else {
    return (
      <FlatList
        data={recipes}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <Recipe
              key={Math.random()}
              title={item.title}
              image={item.image}
              source={item.source}
              sourceUrl={item.sourceUrl}
              portion={item.portion}
              dietLabels={item.dietLabels}
              healthLabels={item.healthLabels}
              cautions={item.cautions}
              text={item.text}
              ingredients={item.ingredients}
              calories={item.calories}
              totalTime={item.totalTime}
              totalNutrients={item.totalNutrients}
              totalDaily={item.totalDaily}
              totalWeight={item.totalWeight}
            />
          );
        }}
      />
    );
  }
}
