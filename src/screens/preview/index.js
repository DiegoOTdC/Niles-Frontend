import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  Button,
  Image,
  ScrollView,
} from "react-native";
import * as firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../store/recipes/actions";
import { selectLabels } from "../../store/labels/selectors";
import { AppLoading } from "expo";

export default function index({ route, navigation }) {
  const [foodLabel, setFoodLabel] = useState("");

  const imageUri = route.params;
  console.log("imageURI", imageUri);

  const labels = useSelector(selectLabels);
  console.log("these are the labels in preview", labels);

  // useEffect(() => {
  //   setFoodLabel(
  //     labels.map((label) => {
  //       return { label: label, selected: false };
  //     })
  //   );
  // }, [labels]);

  console.log("Which foodlabel is here?", foodLabel);

  const dispatch = useDispatch();
  // const imageUrl = useSelector(selectImageUrl);
  // console.log("is this the imageUrl?", imageUrl);

  function fetchRecipes(event, foodLabel) {
    event.persist();
    console.log("foodlabel inside fetchRecipes", foodLabel);

    dispatch(getRecipes(foodLabel));
    navigation.navigate("Recipes");
  }

  // function fetchRecipes(event, imageUri) {
  //   event.persist();
  //   console.log("imageUrl in fecth recipes", imageUri);

  //   if (imageUri) {
  //     this.uploadImage(imageUri, "test-image2")
  //       .then(() => {
  //         console.log("Success!");
  //         const imageRef = firebase
  //           .storage()
  //           .ref()
  //           .child("images/" + "test-image2");
  //         imageRef
  //           .getDownloadURL()
  //           .then((url) => dispatch(getRecipes(url)))
  //           .then(() => navigation.navigate("Recipes"))
  //           .catch((e) =>
  //             console.log("getting downloadURL of image error", e.message)
  //           );
  //       })
  //       .catch((e) => {
  //         console.log(e.message);
  //       });
  //   }

  // dispatch(getRecipes(imageUrl));
  // navigation.navigate("Recipes");
  // }

  //upload image to firebase
  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child("images/" + imageName);

    return ref.put(blob);
  };

  // function selectLabel(event, label) {
  //   event.persist();
  //   console.log("selected a label", label);
  //   if (foodLabel) {
  //     console.log(foodLabel);
  //     foodLabel.filter((item) => {
  //       if (label === item.label) {
  //         return setFoodLabel((prevState) => ({
  //           ...prevState,
  //           item: { ...prevState.label, selected: true },
  //         }));
  //       } else {
  //         return false;
  //       }
  //     });
  //   }
  // }

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
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {labels ? (
            labels.map((label) => {
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
            })
          ) : (
            <AppLoading />
          )}
        </ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <Text>Is the picture clear?</Text>
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
