import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  Button,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Loading from "../../components/Loading";

import { getRecipes } from "../../store/recipes/actions";

import { removeUrl } from "../../store/labels/actions";
import { removeNameOfProduct } from "../../store/labels/actions";
import { removeLabels } from "../../store/labels/actions";
import { removeMessage } from "../../store/labels/actions";

import { selectLabels } from "../../store/labels/selectors";
import { selectMessage } from "../../store/labels/selectors";
import { selectNameOfProduct } from "../../store/labels/selectors";
import { selectRecipes } from "../../store/recipes/selectors";

export default function index({ route, navigation }) {
  const { imageUri } = route.params || {};
  const dispatch = useDispatch();

  const labels = useSelector(selectLabels);
  const message = useSelector(selectMessage);
  const nameOfProduct = useSelector(selectNameOfProduct);
  const recipes = useSelector(selectRecipes);

  const [foodLabel, setFoodLabel] = useState("");
  const [loading, setLoading] = useState(false);

  function fetchRecipes(event, foodLabel) {
    event.persist();
    setLoading(true);
    dispatch(getRecipes(foodLabel));
  }

  useEffect(() => {
    if (recipes && recipes.message) {
      setLoading(false);
      Alert.alert(recipes.message);
      dispatch(removeMessage());
    } else if (recipes && loading) {
      setLoading(false);
      navigation.navigate("Recipes");
    }
  }, [recipes]);

  if (loading) {
    return <Loading />;
  }

  if (message) {
    Alert.alert(message);
  }

  function goToBarcodeScanner() {
    setFoodLabel("");
    dispatch(removeLabels());
    dispatch(removeUrl());
    dispatch(removeNameOfProduct());
    navigation.navigate("BarcodeScanner");
  }

  function goToCamera() {
    setFoodLabel("");
    dispatch(removeLabels());
    dispatch(removeUrl());
    dispatch(removeNameOfProduct());
    navigation.navigate("Camera");
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {!imageUri ? (
        <Text>This is the name of the product: {nameOfProduct}</Text>
      ) : (
        <Image
          style={{ width: "100%", height: "50%" }}
          source={
            imageUri === {}
              ? require("../../images/placeholder.png")
              : { uri: imageUri }
          }
        />
      )}
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
            onPress={() => {
              if (nameOfProduct) {
                goToBarcodeScanner();
              } else {
                goToCamera();
              }
            }}
          />
          <Button
            title={nameOfProduct ? "Try Camera" : "Try Barcode Scanner"}
            onPress={() => {
              if (nameOfProduct) {
                goToCamera();
              } else {
                goToBarcodeScanner();
              }
            }}
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
