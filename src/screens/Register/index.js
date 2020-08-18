import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { green, darkGreen, budGreen, brown, blue } from "../../colours";
import { AlfaSlabOne_400Regular } from "@expo-google-fonts/alfa-slab-one";
import { useFonts, Alata_400Regular } from "@expo-google-fonts/alata";
import { Rochester_400Regular } from "@expo-google-fonts/rochester";
import { GreatVibes_400Regular } from "@expo-google-fonts/great-vibes";

const alfa = "AlfaSlabOne_400Regular";
const alata = "Alata_400Regular";
const rochester = "Rochester_400Regular";
const greatVibes = "GreatVibes_400Regular";

export default function Register({ navigation }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = useSelector(selectToken);

  const [fontsLoaded] = useFonts({
    AlfaSlabOne_400Regular,
    Alata_400Regular,
    Rochester_400Regular,
    GreatVibes_400Regular,
  });

  function onPress(name, email, password) {
    dispatch(register(name, email, password));
    setName("");
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
          <View style={styles.register}>
            <View
              style={{
                width: 350,
                height: 350,
                backgroundColor: brown,
                borderRadius: 175,
                marginTop: -10,
              }}
            ></View>

            <TextInput
              style={[
                styles.text,
                { backgroundColor: budGreen, paddingBottom: 3, marginTop: 25 },
              ]}
              placeholder="name"
              placeholderTextColor={green}
              onChangeText={(text) => setName(text)}
              value={name}
            />
            <TextInput
              style={[
                styles.text,
                { backgroundColor: budGreen, paddingBottom: 3, marginTop: 20 },
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
            <TouchableWithoutFeedback
              onPress={() => onPress(name, email, password)}
            >
              <Text
                style={[
                  styles.text,
                  { backgroundColor: brown, marginTop: 20, paddingTop: 5 },
                ]}
              >
                Register
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
                Already have an account?
              </Text>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("Login")}
              >
                <Text
                  style={{
                    color: brown,
                    fontFamily: alata,
                    fontSize: 20,
                  }}
                >
                  Login
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
  register: {
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
