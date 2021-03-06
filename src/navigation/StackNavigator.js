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

export default function StackNavigator() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <MessageBox />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Preview" component={Preview} />
        <Stack.Screen name="Recipes" component={Recipes} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
