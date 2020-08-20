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
  ScrollView,
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

import { green, darkGreen, blue, lightGreen, darkBlue } from "../../colours";

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
  const [allLabels, setAllLabels] = useState(null);

  const [fontsLoaded] = useFonts({
    Alata_400Regular,
  });

  useEffect(() => {
    const object =
      labels &&
      labels.reduce((a, key) => Object.assign(a, { [key]: false }), {});
    setAllLabels(object);
  }, [labels]);

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

  function chooseLabel(label) {
    if (allLabels) {
      for (const [key, value] of Object.entries(allLabels)) {
        if (allLabels[label]) {
          setAllLabels({ ...allLabels, [key]: false });
          setFoodLabel("");
        } else {
          setAllLabels({ ...allLabels, [key]: false, [label]: true });
          setFoodLabel(label);
        }
      }
    }
  }

  console.log(allLabels);

  console.log("what is foodlabel", foodLabel);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: green,
        alignItems: "center",
      }}
    >
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={{
          flex: 1,
          width: "100%",
          height: "50%",
        }}
      >
        <Image
          style={{
            width: 400,
            height: 400,
            margin: "2.5%",
            borderRadius: 200,
          }}
          source={
            imageUri === {}
              ? require("../../images/placeholder.png")
              : { uri: imageUri }
          }
        />

        <Text
          style={{
            fontFamily: alata,
            fontSize: 21,
            textAlign: "center",
            margin: 10,
            color: blue,
          }}
        >
          Please select the label that fits your product best!
        </Text>

        {labels && labels ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginHorizontal: 40,
              paddingRight: 10,
              flexWrap: "wrap",
            }}
          >
            {labels.map((label) => {
              return (
                <View
                  key={label + Math.random()}
                  style={{
                    backgroundColor:
                      allLabels && allLabels[label] ? blue : darkGreen,
                    marginTop: 10,
                    marginLeft: 10,
                    borderRadius: 25,
                    padding: 10,
                  }}
                >
                  <TouchableWithoutFeedback
                    onPress={() => {
                      chooseLabel(label);
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: alata,
                        fontSize: 15,
                        color: lightGreen,
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
        <TouchableWithoutFeedback
          onPress={(event) => fetchRecipes(event, foodLabel)}
        >
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginTop: 20,
              borderRadius: 25,
              backgroundColor: foodLabel ? blue : green,
              paddingHorizontal: 20,
              paddingVertical: 1,
            }}
          >
            <Text
              style={{
                fontFamily: alata,
                fontSize: 15,
                color: foodLabel ? darkGreen : blue,
                paddingVertical: 10,
              }}
            >
              Search for recipes with
            </Text>
            {foodLabel ? (
              <View
                style={{
                  backgroundColor: blue,
                  marginHorizontal: 10,
                  borderRadius: 25,
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: alata,
                    fontSize: 15,
                    color: lightGreen,
                  }}
                >
                  {foodLabel}
                </Text>
              </View>
            ) : (
              <Text
                style={{
                  fontFamily: alata,
                  fontSize: 15,
                  color: blue,
                  paddingVertical: 10,
                }}
              >
                .....
              </Text>
            )}
            <Text
              style={{
                fontFamily: alata,
                fontSize: 15,
                color: foodLabel ? darkGreen : blue,
                paddingVertical: 10,
              }}
            >
              {foodLabel ? "!" : "?"}
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <View
          style={{
            flexDirection: "row",
            margin: 10,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              if (nameOfProduct) {
                goToBarcodeScanner();
              } else {
                goToCamera();
              }
            }}
          >
            <Text
              style={{
                fontFamily: alata,
                fontSize: 18,
                textAlign: "center",
                margin: 10,
                color: blue,
                borderWidth: 1,
                borderColor: blue,
                borderRadius: 25,
                paddingHorizontal: 20,
                paddingTop: 3,
                paddingBottom: 5,
              }}
            >
              Try again
            </Text>
          </TouchableWithoutFeedback>
          <Text
            style={{
              fontFamily: alata,
              fontSize: 20,
              textAlign: "center",
              margin: 10,
              color: blue,
            }}
          >
            or
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              if (nameOfProduct) {
                goToCamera();
              } else {
                goToBarcodeScanner();
              }
            }}
          >
            <Text
              style={{
                fontFamily: alata,
                fontSize: 18,
                textAlign: "center",
                margin: 10,
                color: blue,
                borderWidth: 1,
                borderColor: blue,
                borderRadius: 25,
                paddingHorizontal: 20,
                paddingTop: 3,
                paddingBottom: 5,
              }}
            >
              {nameOfProduct ? "Try Camera" : "Try Barcode Scanner"}
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
