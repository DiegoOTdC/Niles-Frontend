import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
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

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = useSelector(selectToken);

  const [fontsLoaded] = useFonts({
    AlfaSlabOne_400Regular,
    Alata_400Regular,
  });

  function onPress(email, password) {
    dispatch(login(email, password));
    setEmail("");
    setPassword("");
  }

  useEffect(() => {
    console.log("what is in token?", token);
    if (token !== null) {
      navigation.navigate("HomeScreen");
    }
  }, [token, navigation]);

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
