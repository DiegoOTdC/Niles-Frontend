import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import HomeButton from "../../components/HomeButton";
import { AppLoading } from "expo";

import { green, blue, brown } from "../../colours";
import {
  useFonts,
  AlfaSlabOne_400Regular,
} from "@expo-google-fonts/alfa-slab-one";
import { Alata_400Regular } from "@expo-google-fonts/alata";
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins";
const alfa = "AlfaSlabOne_400Regular";
const alata = "Alata_400Regular";
const poppins = "Poppins_600SemiBold";

import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import { selectUser } from "../../store/user/selectors";
import { showMessageWithTimeout } from "../../store/appState/actions";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const [text, setText] = useState(false);

  const [fontsLoaded] = useFonts({
    AlfaSlabOne_400Regular,
    Alata_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    setTimeout(() => {
      setText(true);
    }, 3000);
  }, []);

  if (!token) {
    dispatch(
      showMessageWithTimeout(
        "danger",
        "You are not logged in, please login",
        3000
      )
    );
    navigation.navigate("Login");
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <HomeButton
          style={{ justifyContent: "top" }}
          title="Scan Image"
          onPress={() => navigation.navigate("Camera")}
          backgroundColor={green}
          color={blue}
          font={alfa}
        />
        <HomeButton
          style={{ justifyContent: "top" }}
          title="Scan Barcode"
          onPress={() => navigation.navigate("BarcodeScanner")}
          backgroundColor={blue}
          color={green}
          font={alfa}
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 420,
              height: 420,
            }}
            source={require("../../images/nilesOnHomeScreen.gif")}
          />
        </View>
        {text ? (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 13,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: poppins, fontSize: 20, color: brown }}>
              {user.name}
            </Text>
          </View>
        ) : null}
        {text ? (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 8,
              bottom: 85,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                fontFamily: alata,
                fontSize: 20,
                color: green,
                backgroundColor: brown,
                borderRadius: 25,
                paddingHorizontal: 10,
              }}
            >
              LOGOUT
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
}
