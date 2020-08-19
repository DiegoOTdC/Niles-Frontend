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
        <Text adjustFontSizeToFit={true} numberOfLines={3} style={styles.title}>
          {title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  recipeCard: {
    flex: 0.5,
    justifyContent: "space-between",
    backgroundColor: red,
    margin: 10,
    height: 280,
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 90,
  },
  touch: { backgroundColor: green, width: "50%" },
  title: {
    alignSelf: "center",
    fontFamily: alfa,
    fontSize: 20,
    color: "white",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
