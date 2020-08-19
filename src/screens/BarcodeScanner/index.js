import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";
import Loading from "../../components/Loading";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from "react-native";

import { fetchBarcodeLabels } from "../../store/labels/actions";
import { removeLabels } from "../../store/labels/actions";
import { removeMessage } from "../../store/labels/actions";
import { removeRecipes } from "../../store/recipes/actions";

import { selectUrl } from "../../store/labels/selectors";
import { selectLabels } from "../../store/labels/selectors";
import { selectMessage } from "../../store/labels/selectors";

import { blue, lightBrown, lightBlue } from "../../colours";
import { useFonts, Alata_400Regular } from "@expo-google-fonts/alata";
const alata = "Alata_400Regular";

export default function BarcodeScanner({ navigation }) {
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [fontColor, setFontColor] = useState(lightBrown);
  const imageUri = useSelector(selectUrl);
  const labels = useSelector(selectLabels);
  const message = useSelector(selectMessage);
  const [fontsLoaded] = useFonts({ Alata_400Regular });

  if (message) {
    Alert.alert(message);
    dispatch(removeLabels());
    dispatch(removeMessage());
    dispatch(removeRecipes());
  }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    dispatch(fetchBarcodeLabels(data));
    setScanned(true);
  };

  useEffect(() => {
    if (scanned && imageUri && !message && labels) {
      setScanned(false);
      navigation.navigate("Preview", { imageUri });
    }
  }, [scanned, handleBarCodeScanned]);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: blue,
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          color: lightBrown,
          fontFamily: alata,
          fontSize: 35,
          marginTop: 25,
        }}
      >
        Aim at the barcode!
      </Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <TouchableHighlight
          style={{ alignSelf: "center", marginBottom: 25 }}
          activeOpacity={1}
          underlayColor={blue}
          onShowUnderlay={() => setFontColor(lightBlue)}
          onPress={() => {
            setFontColor(lightBrown);
            setScanned(false);
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: fontColor,
              fontSize: 35,
              fontFamily: alata,
            }}
          >
            Tap to Scan Again
          </Text>
        </TouchableHighlight>
      )}
    </View>
  );
}
