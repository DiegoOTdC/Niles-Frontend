import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, TouchableOpacity, Image } from "react-native";
import * as firebase from "firebase";
import { Camera } from "expo-camera";
import Loading from "../../components/Loading";

import { fetchImageLabels } from "../../store/labels/actions";
import { appLoading, appDoneLoading } from "../../store/appState/actions";
import { removeLabels } from "../../store/labels/actions";
import { removeRecipes } from "../../store/recipes/actions";
import { selectUser } from "../../store/user/selectors";
import { selectUrl } from "../../store/labels/selectors";
import { selectAppLoading } from "../../store/appState/selectors";

import { useIsFocused } from "@react-navigation/native";

export default function CameraScreen({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [opacity, setOpacity] = useState(1);
  const user = useSelector(selectUser);
  const url = useSelector(selectUrl);
  const isLoading = useSelector(selectAppLoading);
  const firebaseUrl = url && url.split(".");

  useEffect(() => {
    if (isFocused) {
      dispatch(removeLabels());
      dispatch(removeRecipes());
    }
  }, [isFocused]);

  //Only remove the image and url from firebase (and store), not our barcode image url.
  if (url && firebaseUrl[0] === "https://firebasestorage") {
    const imageRef = firebase
      .storage()
      .ref()
      .child("images/" + `image-user${user.id}`);

    imageRef && imageRef.delete();
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const scan = async () => {
    if (this.camera) {
      try {
        const image = await this.camera.takePictureAsync();
        const imageUri = image.uri;

        if (imageUri && user) {
          dispatch(appLoading());
          this.uploadImage(imageUri, `image-user${user.id}`)
            .then(() => {
              console.log("Success!");
              const imageRef = firebase
                .storage()
                .ref()
                .child("images/" + `image-user${user.id}`);
              imageRef
                .getDownloadURL()
                .then((url) => {
                  dispatch(fetchImageLabels(url));
                })
                .then(() => {
                  dispatch(appDoneLoading());
                  navigation.navigate("Preview", { imageUri });
                })
                .catch((e) =>
                  console.log("getting downloadURL of image error", e.message)
                );
            })
            .catch((e) => {
              console.log(e.message);
            });
        }
      } catch (e) {
        console.log("error:", e.message);
      }
    }
  };

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

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <View style={{ flex: 1 }}>
        {isFocused ? (
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.back}
            flashMode={Camera.Constants.FlashMode.auto}
            ref={(ref) => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPressIn={() => setOpacity(0.5)}
                onPressOut={() => setOpacity(1)}
                onLongPress={scan}
                style={{
                  flex: 1,
                  alignSelf: "center",
                  alignItems: "center",
                }}
                onPress={scan}
              >
                <Image
                  style={{ width: 418, height: 570, opacity: opacity }}
                  source={require("../../images/pressToScan.png")}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        ) : null}
      </View>
    );
  }
}
