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
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { green, budGreen, brown, blue } from "../../colours";
import { useFonts, Alata_400Regular } from "@expo-google-fonts/alata";
import { GreatVibes_400Regular } from "@expo-google-fonts/great-vibes";
const alata = "Alata_400Regular";
const greatVibes = "GreatVibes_400Regular";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fontsLoaded] = useFonts({
    Alata_400Regular,
    GreatVibes_400Regular,
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
      <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: green }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.login}>
            <View
              style={{
                width: 350,
                height: 350,
                backgroundColor: brown,
                borderRadius: 175,
                marginTop: -10,
              }}
            ></View>
            <View
              style={{
                width: "70%",
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: greatVibes,
                  color: blue,
                  fontSize: 75,
                }}
              >
                Welcome
              </Text>
            </View>
            <TextInput
              style={[
                styles.text,
                { backgroundColor: budGreen, paddingBottom: 3, marginTop: 25 },
              ]}
              placeholder="email"
              placeholderTextColor={green}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <TextInput
              style={[
                styles.text,
                { backgroundColor: budGreen, paddingBottom: 3, marginTop: 20 },
              ]}
              placeholder="password"
              placeholderTextColor={green}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <TouchableWithoutFeedback onPress={() => onPress(email, password)}>
              <Text
                style={[
                  styles.text,
                  { backgroundColor: brown, marginTop: 20, paddingTop: 5 },
                ]}
              >
                Login!
              </Text>
            </TouchableWithoutFeedback>
            <View
              style={{
                flexDirection: "row",
                width: "70%",
                justifyContent: "center",
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  color: budGreen,
                  fontFamily: alata,
                  fontSize: 15,
                  marginRight: 15,
                  paddingTop: 5,
                }}
              >
                Don't have an account?
              </Text>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("Register")}
              >
                <Text
                  style={{
                    color: brown,
                    fontFamily: alata,
                    fontSize: 20,
                  }}
                >
                  Register
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: green,
  },
  text: {
    height: 60,
    fontFamily: alata,
    fontSize: 25,
    color: green,
    width: "70%",
    textAlign: "center",
  },
});
