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
import { AppLoading } from "expo";
import {
  useFonts,
  AlfaSlabOne_400Regular,
} from "@expo-google-fonts/alfa-slab-one";

export default function Recipe(prop) {
  const [fontsLoaded] = useFonts({
    AlfaSlabOne_400Regular,
  });

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

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
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
}

const styles = StyleSheet.create({
  recipeCard: {
    flex: 0.5,
    backgroundColor: "#a53f2bff",
    margin: 10,
  },
  image: { width: "100%", height: 150 },
  touch: { backgroundColor: "#b3d89cff", width: "50%" },
  title: {
    alignSelf: "center",
    fontFamily: "AlfaSlabOne_400Regular",
    fontSize: 20,
    color: "white",
    padding: 10,
  },
});
