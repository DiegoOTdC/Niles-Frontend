import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, ImageBackground, Button, ScrollView } from "react-native";
import { selectRecipes } from "../../store/recipes/selectors";
import Recipe from "../../components/Recipe";

export default function Recipes({ route, navigation }) {
  const recipes = useSelector(selectRecipes);
  console.log("Recipes in recipes", recipes);

  if (recipes) {
    return (
      <ScrollView>
        {recipes.map((recipe) => {
          return (
            <Recipe
              key={Math.random()}
              title={recipe.title}
              image={recipe.image}
              source={recipe.source}
              sourceUrl={recipe.sourceUrl}
              portion={recipe.portion}
              dietLabels={recipe.dietLabels}
              healthLabels={recipe.healthLabels}
              cautions={recipe.cautions}
              text={recipe.text}
              ingredients={recipe.ingredients}
              calories={recipe.calories}
              totalTime={recipe.totalTime}
              totalNutrients={recipe.totalNutrients}
              totalDaily={recipe.totalDaily}
              totalWeight={recipe.totalWeight}
            />
          );
        })}
      </ScrollView>
    );
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
}
