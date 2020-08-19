import React from "react";
import { Text, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import placeholder from "../../images/placeholder.png";

import { green, red } from "../../colours";
import {
  useFonts,
  AlfaSlabOne_400Regular,
} from "@expo-google-fonts/alfa-slab-one";
const alfa = "AlfaSlabOne_400Regular";

export default function Recipe(props) {
  const [fontsLoaded] = useFonts({
    AlfaSlabOne_400Regular,
  });

  const { title, image } = props;

  if (!fontsLoaded) {
    return <ActivityIndicator color="#a53f2bff" />;
  } else {
    return (
      <View style={styles.recipeCard}>
        <Image
          style={styles.image}
          source={{ uri: image ? image : placeholder }}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  recipeCard: {
    flex: 0.5,
    backgroundColor: red,
    margin: 10,
  },
  image: { width: "100%", height: 150 },
  touch: { backgroundColor: green, width: "50%" },
  title: {
    alignSelf: "center",
    fontFamily: alfa,
    fontSize: 20,
    color: "white",
    padding: 10,
  },
});
