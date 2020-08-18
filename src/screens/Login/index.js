import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { green, darkGreen, budGreen, brown } from "../../colours";
import { AlfaSlabOne_400Regular } from "@expo-google-fonts/alfa-slab-one";
import { useFonts, Alata_400Regular } from "@expo-google-fonts/alata";

const Alfa = "AlfaSlabOne_400Regular";
const Alata = "Alata_400Regular";

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fontsLoaded] = useFonts({
    AlfaSlabOne_400Regular,
    Alata_400Regular,
  });

  function onPress(email, password) {
    console.log(`onPress email: ${email} and password: ${password}`);
    // dispatch(login(email, password));

    setEmail("");
    setPassword("");
  }

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  } else {
    return (
      <View style={styles.login}>
        <Text style={{ fontFamily: Alfa }}>Login page</Text>
        <TextInput
          style={[styles.text, { backgroundColor: budGreen }]}
          placeholder="name / email"
          placeholderTextColor={green}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={[styles.text, { backgroundColor: budGreen }]}
          placeholder="password"
          placeholderTextColor={green}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableWithoutFeedback onPress={() => onPress(email, password)}>
          <Text style={[styles.text, { backgroundColor: brown }]}>Login!</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login: { flex: 1, backgroundColor: green, alignItems: "center" },
  text: {
    height: 60,
    textAlign: "center",
    fontFamily: Alata,
    fontSize: 25,
    color: green,
    width: "70%",
  },
});
