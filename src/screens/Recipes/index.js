import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  ImageBackground,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { selectRecipes } from "../../store/recipes/selectors";
import Recipe from "../../components/Recipe";
import { AppLoading } from "expo";

export default function Recipes({ route, navigation }) {
  const recipes = useSelector(selectRecipes);

  if (!recipes) {
    return <AppLoading />;
  } else {
    return (
      <FlatList
        data={recipes}
        numColumns={2}
        renderItem={({ item }) => {
          const props = [item.title, item.image, item.source];

          return (
            <TouchableOpacity
              style={styles.touch}
              onPress={() => navigation.navigate("RecipeDetails", props)}
            >
              <Recipe
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
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.title + item.source}
      />
    );
  }
}

const styles = StyleSheet.create({
  touch: { backgroundColor: "#b3d89cff", width: "50%" },
});
