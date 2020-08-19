import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  SafeAreaView,
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

import { green, darkGreen, blue } from "../../colours";

import { useFonts, Alata_400Regular } from "@expo-google-fonts/alata";
const alata = "Alata_400Regular";

export default function index({ route, navigation }) {
  const { imageUri } = route.params || {};
  const dispatch = useDispatch();

  const labels = useSelector(selectLabels);
  const message = useSelector(selectMessage);
  const nameOfProduct = useSelector(selectNameOfProduct);
  const recipes = useSelector(selectRecipes);

  const [foodLabel, setFoodLabel] = useState("");
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Alata_400Regular,
  });
  console.log("what is labels", labels);

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
    dispatch(removeMessage());
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

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: green,
      }}
    >
      <Image
        style={{ width: "100%", height: "50%" }}
        source={
          imageUri === {}
            ? require("../../images/placeholder.png")
            : { uri: imageUri }
        }
      />

      <View
        style={{
          width: "100%",
          height: "50%",
        }}
      >
        <Text
          style={{
            fontFamily: alata,
            fontSize: 20,
            textAlign: "center",
            margin: 10,
            color: blue,
          }}
        >
          Please select the label that fits your product best!
        </Text>

        {labels ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {labels.map((label) => {
              return (
                <View
                  key={label + Math.random()}
                  style={{
                    backgroundColor: darkGreen,
                    marginTop: 10,
                    marginLeft: 10,
                    borderRadius: 25,
                    padding: 10,
                  }}
                >
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setFoodLabel(label);
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: alata,
                        fontSize: 15,
                        color: green,
                      }}
                    >
                      {label}
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
              );
            })}
          </View>
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
    </SafeAreaView>
  );
}
