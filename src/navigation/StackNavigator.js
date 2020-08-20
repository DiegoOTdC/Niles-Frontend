import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import BarcodeScanner from "../screens/BarcodeScanner";
import CameraScreen from "../screens/Camera";
import Preview from "../screens/Preview";
import Recipes from "../screens/Recipes";
import RecipeDetails from "../screens/RecipeDetails";
import Register from "../screens/Register";
import Login from "../screens/Login";
import MessageBox from "../components/MessageBox";

import { useSelector } from "react-redux";
import { selectToken } from "../store/user/selectors";

export default function StackNavigator() {
  const Stack = createStackNavigator();
  const token = useSelector(selectToken);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        {!token ? <Stack.Screen name="Login" component={Login} /> : null}
        {!token ? <Stack.Screen name="Register" component={Register} /> : null}
        <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Preview" component={Preview} />
        <Stack.Screen name="Recipes" component={Recipes} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
