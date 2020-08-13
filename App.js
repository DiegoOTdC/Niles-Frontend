import * as React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import Camera from "./src/screens/Camera";
import Preview from "./src/screens/preview";
import Recipes from "./src/screens/Recipes";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAm0BbCJAo1vuJ-G_eS8pORPJX4N9MO7-E",
  authDomain: "niles-tdms.firebaseapp.com",
  databaseURL: "https://niles-tdms.firebaseio.com/",
  projectId: "niles-tdms",
  storageBucket: "gs://niles-tdms.appspot.com",
  messagingSenderId: "221952632429",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="Preview" component={Preview} />
          <Stack.Screen name="Recipes" component={Recipes} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
