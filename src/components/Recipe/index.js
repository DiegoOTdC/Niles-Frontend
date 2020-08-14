import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import placeholder from "../../images/placeholder.png";

export default function Recipe(prop) {
  const {
    title,
    image,
    source,
    sourceUrl,
    portion,
    dietLabels,
    healthLabels,
    cautions,
    text,
    ingredients,
    calories,
    totalTime,
    totalNutrients,
    totalDaily,
    totalWeight,
  } = prop;

  console.log("this is in the image", image);

  return (
    <TouchableOpacity style={styles.touch}>
      <View style={styles.recipeCard}>
        <Image
          style={styles.image}
          source={{ uri: image ? image : placeholder }}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  recipeCard: {
    backgroundColor: "green",
    width: "50%",
    marginBottom: 10,
    flexDirection: "column",
  },
  image: { width: 100, height: 100 },
  touch: { backgroundColor: "#DDDDDD" },
  title: {},
});
