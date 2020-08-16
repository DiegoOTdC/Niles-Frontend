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
import { Table, Row, Rows } from "react-native-table-component";

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

        const totalNutrientsArray = [
          totalNutrients.ENERC_KCAL,
          totalNutrients.CHOCDF,
          totalNutrients.SUGAR,
          totalNutrients.FAT,
          totalNutrients.FASAT,
          totalNutrients.FIBTG,
          totalNutrients.PROCNT,
          totalNutrients.NA,
          totalNutrients.WATER,
          totalNutrients.CA,
          totalNutrients.CHOLE,
          totalNutrients.FAMS,
          totalNutrients.FAPU,
          totalNutrients.FE,
          totalNutrients.FOLAC,
          totalNutrients.FOLDFE,
          totalNutrients.FOLFD,
          totalNutrients.K,
          totalNutrients.MG,
          totalNutrients.NIA,
          totalNutrients.P,
          totalNutrients.RIBF,
          totalNutrients.THIA,
          totalNutrients.TOCPHA,
          totalNutrients.VITA_RAE,
          totalNutrients.VITB12,
          totalNutrients.VITB6A,
          totalNutrients.VITC,
          totalNutrients.VITD,
          totalNutrients.VITK1,
          totalNutrients.ZN,
        ];

        const totalDailyArray = [
          totalDaily.ENERC_KCAL,
          totalDaily.CHOCDF,
          totalDaily.SUGAR,
          totalDaily.FAT,
          totalDaily.FASAT,
          totalDaily.FIBTG,
          totalDaily.PROCNT,
          totalDaily.NA,
          totalDaily.WATER,
          totalDaily.CA,
          totalDaily.CHOLE,
          totalDaily.FAMS,
          totalDaily.FAPU,
          totalDaily.FE,
          totalDaily.FOLAC,
          totalDaily.FOLDFE,
          totalDaily.FOLFD,
          totalDaily.K,
          totalDaily.MG,
          totalDaily.NIA,
          totalDaily.P,
          totalDaily.RIBF,
          totalDaily.THIA,
          totalDaily.TOCPHA,
          totalDaily.VITA_RAE,
          totalDaily.VITB12,
          totalDaily.VITB6A,
          totalDaily.VITC,
          totalDaily.VITD,
          totalDaily.VITK1,
          totalDaily.ZN,
        ];

        console.log("totaldailyarray", totalDailyArray);
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
                <Text>Portions: {portion}</Text>

                <Text style={styles.middleText}>
                  Ingredients: {"\n\n"}
                  {item.ingredients.map((ingredient) => {
                    return (
                      <TouchableWithoutFeedback
                        key={ingredient.text}
                        onPress={() => {
                          console.log("pressed");
                          setCheck(!check);
                        }}
                      >
                        <Text style={{ flexDirection: "row" }}>
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
                  //
                  //
                  //LESS INFORMATION
                  //
                  //

                  <View>
                    <View style={styles.table}>
                      <View style={styles.tableColumn}>
                        <View style={styles.tableTopLeftRow}></View>

                        {totalNutrientsArray.slice(0, 8).map((item) => {
                          return (
                            <View key={item.label} style={styles.tableLeftRow}>
                              <Text style={styles.tableText}>{item.label}</Text>
                            </View>
                          );
                        })}
                      </View>
                      <View style={styles.tableColumn}>
                        <View style={styles.tableTopRow}>
                          <Text style={styles.tableTopText}>
                            per 100 gram:{"\n"}
                          </Text>
                        </View>

                        {totalNutrientsArray.slice(0, 8).map((item) => {
                          const number = 0.001;
                          const amount = (
                            (item.quantity / totalWeight) *
                            100
                          ).toFixed(2);

                          return (
                            <View key={item.label + 1} style={styles.tableRow}>
                              <Text style={styles.tableText}>
                                {amount === number.toFixed(2)
                                  ? "-"
                                  : amount + " " + item.unit}
                              </Text>
                            </View>
                          );
                        })}
                      </View>

                      <View style={styles.tableColumn}>
                        <View style={styles.tableTopRow}>
                          <Text style={styles.tableTopText}>
                            per portion:{"\n"}(
                            {Math.round(totalWeight / portion)} gram)
                          </Text>
                        </View>

                        {totalNutrientsArray.slice(0, 8).map((item) => {
                          const number = 0.001;
                          const amount = (item.quantity / portion).toFixed(2);
                          return (
                            <View key={item.label + 2} style={styles.tableRow}>
                              <Text style={styles.tableText}>
                                {amount === number.toFixed(2)
                                  ? "-"
                                  : amount + " " + item.unit}
                              </Text>
                            </View>
                          );
                        })}
                      </View>

                      <View style={styles.tableColumn}>
                        <View style={styles.tableTopRightRow}>
                          <Text style={styles.tableTopText}>
                            % D.V.{"\n"}(per portion)
                          </Text>
                        </View>

                        {totalDailyArray.slice(0, 8).map((item) => {
                          return item ? (
                            <View key={item.label + 3} style={styles.tableRow}>
                              <Text style={styles.tableText}>
                                {item && (item.quantity / portion).toFixed(2)}{" "}
                                {item.unit}
                              </Text>
                            </View>
                          ) : (
                            <View key={Math.random()} style={styles.tableRow}>
                              <Text style={styles.tableText}>-</Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setMoreInfo(true);
                      }}
                    >
                      <Text>More information </Text>
                    </TouchableWithoutFeedback>
                  </View>
                ) : (
                  //
                  //
                  // MORE INFORMATION
                  //
                  //

                  <View style={{ width: "100%" }}>
                    <View style={styles.table}>
                      <View style={styles.tableColumn}>
                        <View style={styles.tableTopLeftRow}></View>

                        {totalNutrientsArray.map((item) => {
                          return (
                            <View key={item.label} style={styles.tableLeftRow}>
                              <Text style={styles.tableText}>{item.label}</Text>
                            </View>
                          );
                        })}
                      </View>

                      <View style={styles.tableColumn}>
                        <View style={styles.tableTopRow}>
                          <Text style={styles.tableTopText}>
                            per 100 gram:{"\n"}
                          </Text>
                        </View>

                        {totalNutrientsArray.map((item) => {
                          const number = 0.001;
                          const amount = (
                            (item.quantity / totalWeight) *
                            100
                          ).toFixed(2);

                          return (
                            <View key={item.label + 1} style={styles.tableRow}>
                              <Text style={styles.tableText}>
                                {amount === number.toFixed(2)
                                  ? "-"
                                  : amount + " " + item.unit}
                              </Text>
                            </View>
                          );
                        })}
                      </View>

                      <View style={styles.tableColumn}>
                        <View style={styles.tableTopRow}>
                          <Text style={styles.tableTopText}>
                            per portion:{"\n"}(
                            {Math.round(totalWeight / portion)} gram)
                          </Text>
                        </View>

                        {totalNutrientsArray.map((item) => {
                          const number = 0.001;
                          const amount = (item.quantity / portion).toFixed(2);
                          return (
                            <View key={item.label + 2} style={styles.tableRow}>
                              <Text style={styles.tableText}>
                                {amount === number.toFixed(2)
                                  ? "-"
                                  : amount + " " + item.unit}
                              </Text>
                            </View>
                          );
                        })}
                      </View>

                      <View style={styles.tableColumn}>
                        <View style={styles.tableTopRightRow}>
                          <Text style={styles.tableTopText}>
                            % D.V.{"\n"}(per portion)
                          </Text>
                        </View>

                        {totalDailyArray.map((item) => {
                          return item ? (
                            <View key={item.label + 3} style={styles.tableRow}>
                              <Text style={styles.tableText}>
                                {item && (item.quantity / portion).toFixed(2)}{" "}
                                {item.unit}
                              </Text>
                            </View>
                          ) : (
                            <View key={Math.random()} style={styles.tableRow}>
                              <Text style={styles.tableText}>-</Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>

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

const alfa = "AlfaSlabOne_400Regular";
const alata = "Alata_400Regular";
const green = "#b3d89cff";
const red = "#a53f2bff";

const styles = StyleSheet.create({
  header: {
    backgroundColor: red,
    width: "100%",
    height: 100,
    flexDirection: "column",
    justifyContent: "center",
  },
  headerText: {
    color: green,
    fontSize: 100,
    fontFamily: "AlfaSlabOne_400Regular",
    paddingHorizontal: 20,
    textAlign: "center",
  },
  middle: {
    backgroundColor: green,
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

  table: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 10,
  },

  tableColumn: {
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderColor: red,
  },
  tableTopLeftRow: {
    borderRightColor: green,
    borderLeftColor: red,
    borderBottomColor: red,
    backgroundColor: red,
    width: 150,
    height: 50,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    padding: 3,
  },
  tableTopRightRow: {
    borderColor: red,
    backgroundColor: red,
    height: 50,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    padding: 3,
  },
  tableTopRow: {
    borderBottomColor: red,
    borderRightColor: green,
    backgroundColor: red,
    height: 50,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    padding: 3,
  },
  tableLeftRow: {
    borderColor: red,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    padding: 3,
  },
  tableRow: {
    borderColor: red,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    padding: 3,
  },
  tableTopText: {
    fontSize: 12.5,
    fontFamily: "Alata_400Regular",
    color: green,
  },
  tableText: {
    fontSize: 12.5,
    fontFamily: "Alata_400Regular",
    color: red,
  },
});
