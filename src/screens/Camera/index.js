import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { useDispatch, useSelector } from "react-redux";
import { fetchImageLabels } from "../../store/labels/actions";
import { removeUrl } from "../../store/labels/actions";
import { selectUser } from "../../store/user/selectors";
import { selectUrl } from "../../store/labels/selectors";
import { selectLabels } from "../../store/labels/selectors";
import * as firebase from "firebase";
import Loading from "../../components/Loading";

export default function App({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [loading, setLoading] = useState(false);
  const url = useSelector(selectUrl);

  const labels = useSelector(selectLabels);

  useEffect(() => {
    setLoading(false);
  }, [navigation]);

  const firebaseUrl = url && url.split(".");

  //Only remove the image and url from firebase (and store), not our barcode image url.
  if (url && firebaseUrl[0] === "https://firebasestorage") {
    dispatch(removeUrl());
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

  const snap = async () => {
    if (this.camera) {
      try {
        const image = await this.camera.takePictureAsync();
        const imageUri = image.uri;

        if (imageUri && user) {
          setLoading(true);
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
                .then(() => setLoading(false))
                .then(() => navigation.navigate("Preview", { imageUri }))
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

  if (loading) {
    return <Loading />;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={type}
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
              style={{
                flex: 0.1,
                alignSelf: "flex-end",
                alignItems: "center",
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                {" "}
                Flip{" "}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: "center",
                alignItems: "center",
              }}
              onPress={snap}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                {" "}
                [SCAN IMAGE]{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}
