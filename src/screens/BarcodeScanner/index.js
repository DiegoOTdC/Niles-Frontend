import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBarcodeLabels } from "../../store/labels/actions";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableHighlight,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { blue, lightBrown, lightBlue } from "../../colours";
import { useFonts, Alata_400Regular } from "@expo-google-fonts/alata";

export default function BarcodeScanner() {
  const dispatch = useDispatch();
  useFonts({ Alata_400Regular });
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [fontColor, setFontColor] = useState(lightBrown);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(`type: ${type} with barcode number: ${data}`);
    setScanned(true);
    dispatch(fetchBarcodeLabels(data));
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
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
          fontFamily: "Alata_400Regular",
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
              fontFamily: "Alata_400Regular",
            }}
          >
            Tap to Scan Again
          </Text>
        </TouchableHighlight>
        // <Button
        //   style={{ selfAlign: "center", width: "50%" }}
        //   title={"Tap to Scan Again"}
        //   onPress={() => setScanned(false)}
        // />
      )}
    </View>
  );
}
