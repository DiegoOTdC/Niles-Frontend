import * as React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import BarcodeScanner from "./src/screens/BarcodeScanner";
import Camera from "./src/screens/Camera";
import Preview from "./src/screens/Preview";
import Recipes from "./src/screens/Recipes";
import RecipeDetails from "./src/screens/RecipeDetails";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import * as firebase from "firebase";
import { YellowBox } from "react-native";
import {
  apiKey,
  authDomain,
  databaseUrl,
  projectId,
  storageBucket,
  messagingSenderId,
} from "@env";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseUrl: databaseUrl,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

function App() {
  YellowBox.ignoreWarnings(["Setting a timer"]);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="Preview" component={Preview} />
          <Stack.Screen name="Recipes" component={Recipes} />
          <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
