import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";
import Loading from "../../components/Loading";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";

import { fetchBarcodeLabels } from "../../store/labels/actions";
import { removeLabels } from "../../store/labels/actions";
import { removeRecipes } from "../../store/recipes/actions";
import { selectUrl } from "../../store/labels/selectors";
import { selectLabels } from "../../store/labels/selectors";
import { selectAppLoading } from "../../store/appState/selectors";
import { selectMessage } from "../../store/appState/selectors";

import { blue, green } from "../../colours";
import { useFonts, Alata_400Regular } from "@expo-google-fonts/alata";
const alata = "Alata_400Regular";

import { useIsFocused } from "@react-navigation/native";

export default function BarcodeScanner({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [fontColor, setFontColor] = useState(blue);
  const imageUri = useSelector(selectUrl);
  const labels = useSelector(selectLabels);
  const isLoading = useSelector(selectAppLoading);
  const message = useSelector(selectMessage);
  const [fontsLoaded] = useFonts({ Alata_400Regular });
  const [scanner, setScanner] = useState(true);

  useEffect(() => {
    if (isFocused) {
      dispatch(removeLabels());
      dispatch(removeRecipes());
    }
  }, [isFocused]);

  useEffect(() => {
    setScanner(true);
  }, [scanned]);

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
    if (scanned && imageUri && labels) {
      setScanned(false);
      setScanner(false);
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

  if (isLoading) {
    return <Loading color={blue} />;
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
          color: green,
          fontFamily: alata,
          fontSize: 35,
          marginTop: 25,
        }}
      >
        Aim at the barcode!
      </Text>
      {scanner ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[
            StyleSheet.absoluteFillObject,
            { marginTop: message ? 70 : 0 },
          ]}
        />
      ) : null}

      <View style={{ flexDirection: "row", flex: 1, marginTop: 594 }}>
        <View style={[styles.bar, { width: 10 }]} />
        <View style={[styles.bar, { width: 30 }]} />
        <View style={[styles.bar, { width: 10 }]} />
        <View style={[styles.bar, { width: 5 }]} />
        <View style={[styles.bar, { width: 5 }]} />
        <View style={[styles.bar, { width: 25 }]} />
        <View style={[styles.bar, { width: 10 }]} />
        <View style={[styles.bar, { width: 5 }]} />
        <View style={[styles.bar, { width: 3 }]} />
        <View style={[styles.bar, { width: 15 }]} />
        <View style={[styles.bar, { width: 10 }]} />
        <View style={[styles.bar, { width: 15 }]} />
        <View style={[styles.bar, { width: 25 }]} />
        <View style={[styles.bar, { width: 15 }]} />
        <View style={[styles.bar, { width: 10 }]} />
        <View style={[styles.bar, { width: 25 }]} />
        <View style={[styles.bar, { width: 15 }]} />
        <View style={[styles.bar, { width: 10 }]} />
        <View style={[styles.bar, { width: 3 }]} />
        <View style={[styles.bar, { width: 5 }]} />
        <View style={[styles.bar, { width: 10 }]} />
        <View style={[styles.bar, { width: 20 }]} />
        <View style={[styles.bar, { width: 5 }]} />
        <View style={[styles.bar, { width: 20 }]} />
      </View>

      {scanned && (
        <TouchableHighlight
          style={{
            alignSelf: "center",
            marginBottom: 30,
            backgroundColor: green,
          }}
          activeOpacity={1}
          underlayColor={blue}
          onShowUnderlay={() => setFontColor(green)}
          onPress={() => {
            setFontColor(blue);
            setScanned(false);
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: fontColor,
              fontSize: 45,
              fontFamily: alata,
              marginTop: -15,
              marginBottom: 3,
            }}
          >
            Tap to Scan
          </Text>
        </TouchableHighlight>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 145,
    backgroundColor: green,
    marginRight: 5,
  },
});
