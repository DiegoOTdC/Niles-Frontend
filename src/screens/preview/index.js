import React from "react";
import { Text, View, ImageBackground, Button } from "react-native";
import * as firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../store/recipes/actions";
import { selectLabels } from "../../store/labels/selectors";

export default function index({ route, navigation }) {
  console.log("route", route);
  const imageUri = route.params;
  console.log("imageURI", imageUri);

  const labels = useSelector(selectLabels);
  console.log("these are the labels in preview", labels);

  const dispatch = useDispatch();
  // const imageUrl = useSelector(selectImageUrl);
  // console.log("is this the imageUrl?", imageUrl);

  function fetchRecipes(event, imageUri) {
    event.persist();
    console.log("imageUrl in fecth recipes", imageUri);

    if (imageUri) {
      this.uploadImage(imageUri, "test-image2")
        .then(() => {
          console.log("Success!");
          const imageRef = firebase
            .storage()
            .ref()
            .child("images/" + "test-image2");
          imageRef
            .getDownloadURL()
            .then((url) => dispatch(getRecipes(url)))
            .then(() => navigation.navigate("Recipes"))
            .catch((e) =>
              console.log("getting downloadURL of image error", e.message)
            );
        })
        .catch((e) => {
          console.log(e.message);
        });
    }

    // dispatch(getRecipes(imageUrl));
    // navigation.navigate("Recipes");
  }

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

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
        source={{ uri: imageUri }}
      >
        <View
          style={{
            width: "100%",
            height: "10%",
            backgroundColor: "white",
          }}
        >
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
              onPress={(event) => fetchRecipes(event, imageUri)}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
