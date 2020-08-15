import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../store/recipes/actions";
import { selectLabels } from "../../store/labels/selectors";

export default function index({ route, navigation }) {
  const imageUri = route.params;
  const labels = useSelector(selectLabels);
  const dispatch = useDispatch();
  const [foodLabel, setFoodLabel] = useState("");

  function fetchRecipes(event, foodLabel) {
    event.persist();
    dispatch(getRecipes(foodLabel));
    navigation.navigate("Recipes");
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image
        style={{ width: "100%", height: "50%" }}
        source={{ uri: imageUri }}
      />
      <View
        style={{
          width: "100%",
          height: "50%",
          backgroundColor: "white",
        }}
      >
        <Text>Please select the label that fits your product best!</Text>
        {labels ? (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {labels.map((label) => {
              return (
                <View
                  key={label + Math.random()}
                  style={{ height: 50, backgroundColor: "orange", margin: 10 }}
                >
                  <Button
                    title={label}
                    onPress={() => {
                      setFoodLabel(label);
                    }}
                  />
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <ActivityIndicator />
        )}

        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <Text>Search for recipes with {foodLabel}?</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            justifyContent: "center",
            justifyContent: "space-around",
          }}
        >
          <Button
            title="TRY AGAIN"
            onPress={() => navigation.navigate("Camera")}
          />
          <Button
            title="NILES FETCH RECIPES!"
            onPress={(event) => fetchRecipes(event, foodLabel)}
          />
        </View>
      </View>
    </View>
  );
}
