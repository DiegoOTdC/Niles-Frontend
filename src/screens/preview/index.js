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
          justifyContent: "space-between",
          justifyContent: "space-around",
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
            flexDirection: "row",
            alignSelf: "center",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontFamily: alata,
              fontSize: 15,
              color: blue,
              paddingTop: 20,
            }}
          >
            Search for recipes with
          </Text>
          {foodLabel ? (
            <View
              style={{
                backgroundColor: blue,
                marginTop: 10,
                marginHorizontal: 10,
                borderRadius: 25,
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: alata,
                  fontSize: 15,
                  color: green,
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
                paddingTop: 20,
              }}
            >
              .....
            </Text>
          )}
          <Text
            style={{
              fontFamily: alata,
              fontSize: 15,
              color: blue,
              paddingTop: 20,
            }}
          >
            ?
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
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
