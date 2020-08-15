import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import {
  useFonts,
  AlfaSlabOne_400Regular,
} from "@expo-google-fonts/alfa-slab-one";
import { Alata_400Regular } from "@expo-google-fonts/alata";
import Hyperlink from "react-native-hyperlink";

export default function RecipeDetails({ route, navigation }) {
  const item = route.params;
  const [details, setDetails] = useState([item]);
  const [check, setCheck] = useState(false);
  const [moreInfo, setMoreInfo] = useState(false);

  const [fontsLoaded] = useFonts({
    AlfaSlabOne_400Regular,
    Alata_400Regular,
  });

  console.log("check", check);
  return (
    <View style={{ flex: 1, backgroundColor: "#b3d89cff" }}>
      {details.map((item) => {
        const {
          image,
          title,
          source,
          sourceUrl,
          portion,
          dietLabels,
          healthLabels,
          cautions,
          calories,
          totalTime,
          totalNutrients,
          totalDaily,
          totalWeight,
        } = item;

        return (
          <View style={{ flex: 1 }} key={calories + totalTime}>
            <View style={styles.header}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={styles.headerText}
              >
                {title}
              </Text>
              <Hyperlink
                linkDefault
                linkStyle={{
                  color: "#2980b9",
                  fontSize: 20,
                }}
                linkText={(url) =>
                  url === sourceUrl ? `Read more on ${source}!` : url
                }
              >
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                  {sourceUrl}
                </Text>
              </Hyperlink>
            </View>
            <ScrollView>
              <View style={styles.middle}>
                <Image
                  style={{
                    width: "100%",
                    height: 400,
                    alignSelf: "center",
                  }}
                  source={{ uri: image }}
                />
                <Text>Serves: {portion}</Text>

                <Text style={styles.middleText}>
                  Ingredients: {"\n\n"}
                  {item.ingredients.map((ingredient) => {
                    return (
                      <TouchableWithoutFeedback
                        onPress={() => {
                          console.log("pressed");
                          setCheck(!check);
                        }}
                      >
                        <Text
                          style={{ flexDirection: "row" }}
                          key={ingredient.text}
                        >
                          {!check ? (
                            <Image
                              style={{
                                width: 40,
                                height: 40,
                              }}
                              source={{ uri: ingredient.image }}
                            />
                          ) : (
                            <Text>[GOTIT]</Text>
                          )}
                          -{ingredient.text}
                          {"\n"}
                        </Text>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </Text>

                {!moreInfo ? (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setMoreInfo(true);
                    }}
                  >
                    <Text>More information </Text>
                  </TouchableWithoutFeedback>
                ) : (
                  <View>
                    <Text>
                      {console.log("dietlabels", dietLabels)}{" "}
                      {console.log("healthlabels", healthLabels)}{" "}
                      {console.log("cautions", cautions)}{" "}
                      {console.log("totalNutrients", totalNutrients)}{" "}
                      {console.log("totalDaily", totalDaily)}{" "}
                      {console.log("totalWeight", totalWeight)}{" "}
                    </Text>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setMoreInfo(false);
                      }}
                    >
                      <Text>Less info</Text>
                    </TouchableWithoutFeedback>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#a53f2bff",
    width: "100%",
    height: 100,
    flexDirection: "column",
    justifyContent: "center",
  },
  headerText: {
    color: "#b3d89cff",
    fontSize: 100,
    fontFamily: "AlfaSlabOne_400Regular",
    paddingHorizontal: 20,
    textAlign: "center",
  },
  middle: {
    backgroundColor: "#b3d89cff",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  middleText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Alata_400Regular",
    paddingHorizontal: 10,
  },
});
