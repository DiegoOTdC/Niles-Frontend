import React, { useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import {
  useFonts,
  AlfaSlabOne_400Regular,
} from "@expo-google-fonts/alfa-slab-one";

export default function RecipeDetails({ route, navigation }) {
  const item = route.params;
  const [details, setDetails] = useState([item]);

  const [fontsLoaded] = useFonts({
    AlfaSlabOne_400Regular,
  });

  function MyHeader() {
    return (
      <View style={styles.header}>
        <Text>I am the header!!!</Text>
      </View>
    );
  }

  function MyFooter() {
    return (
      <View>
        <Text>I am the footer!!!</Text>
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={MyHeader}
      data={details}
      renderItem={({ item }) => {
        return (
          <View>
            <Text>I am in the middle, this is the title {item.title}</Text>
          </View>
        );
      }}
      keyExtractor={(item) => item.title + item.source}
      ListFooterComponent={MyFooter}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#a53f2bff",
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
  },
});
