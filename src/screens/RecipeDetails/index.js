import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import {
  useFonts,
  AlfaSlabOne_400Regular,
} from "@expo-google-fonts/alfa-slab-one";
import { Alata_400Regular } from "@expo-google-fonts/alata";
import Hyperlink from "react-native-hyperlink";

const Alfa = "AlfaSlabOne_400Regular";
const Alata = "Alata_400Regular";
const green = "#b3d89cff";
const darkGreen = "#70B247";
const lightGreen = "#C9EBB4";
const red = "#a53f2bff";
const blue = "#3b7080ff";
const lightBlue = "#57AFCA";
const salmon = "#f79f79ff";

export default function RecipeDetails({ route }) {
  const item = route.params;
  const [details, setDetails] = useState([item]);
  const [check, setCheck] = useState(false);
  const [ingredientLines, setIngredientLines] = useState({});
  const [moreInfo, setMoreInfo] = useState(false);

  useFonts({
    AlfaSlabOne_400Regular,
    Alata_400Regular,
  });

  useEffect(() => {
    const items = item.ingredients.map((ingredient) => {
      return ingredient.text;
    });
    const object = items.reduce(
      (a, key) => Object.assign(a, { [key]: false }),
      {}
    );
    setIngredientLines(object);
  }, [item]);

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
          ingredients,
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

        const number = (0.001).toFixed(2);

        function renderAmount(item, amount) {
          if (!item.quantity) {
            return "-";
          } else if (item.quantity && amount === number) {
            return `< 0,01${item.unit}`;
          } else {
            return amount + " " + item.unit;
          }
        }

        function renderLabels(array, color) {
          return array.map((label) => {
            return (
              <View
                key={label}
                style={{
                  backgroundColor: color,
                  padding: 10,
                  borderRadius: 25,
                  marginTop: 10,
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{ color: lightGreen, fontFamily: Alata, fontSize: 12 }}
                >
                  {label}
                </Text>
              </View>
            );
          });
        }

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
                  color: lightBlue,
                  fontSize: 20,
                  textDecorationLine: "underline",
                }}
                linkText={(url) => (url === sourceUrl ? source : url)}
              >
                <Text
                  style={{ fontSize: 18, textAlign: "center", color: green }}
                >
                  Read full recipe on {sourceUrl}!
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

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  {renderLabels(dietLabels, blue)}
                  {renderLabels(healthLabels, darkGreen)}
                  {renderLabels(cautions, salmon)}
                </View>

                <Text style={styles.middleTextCenter}>
                  Ingredients for {portion}{" "}
                  {portion === 1 ? "portion" : "portions"}:
                </Text>
                <View>
                  {ingredients.map((ingredient) => {
                    const image = ingredient.image
                      ? { uri: ingredient.image }
                      : require("../../images/placeholder.png");
                    const thisIngredientLine = ingredient.text;

                    return (
                      <TouchableWithoutFeedback
                        key={
                          ingredient.text + ingredient.weight + ingredient.image
                        }
                        onPress={() => {
                          setCheck(!check);
                          ingredientLines[thisIngredientLine] === false
                            ? setIngredientLines({
                                ...ingredientLines,
                                [thisIngredientLine]: true,
                              })
                            : setIngredientLines({
                                ...ingredientLines,
                                [thisIngredientLine]: false,
                              });
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <View style={{ flexDirection: "column", flex: 8 }}>
                            <Text
                              style={
                                ingredientLines[thisIngredientLine] === false
                                  ? {
                                      color: red,
                                      fontSize: 20,
                                      fontFamily: Alata,
                                      paddingHorizontal: 10,
                                    }
                                  : {
                                      color: red,
                                      fontSize: 20,
                                      fontFamily: Alata,
                                      paddingHorizontal: 10,
                                      textDecorationLine: "line-through",
                                    }
                              }
                            >
                              -{ingredient.text}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "column", flex: 1 }}>
                            {ingredientLines[thisIngredientLine] === false ? (
                              <Image
                                style={{
                                  width: 40,
                                  height: 40,
                                }}
                                source={image}
                              />
                            ) : (
                              <View style={{ width: 40, height: 40 }}>
                                <ImageBackground
                                  style={{
                                    resizeMode: "cover",
                                    justifyContent: "center",
                                    flex: 1,
                                    opacity: 0.5,
                                  }}
                                  source={image}
                                >
                                  <Text
                                    style={{
                                      color: red,
                                      fontSize: 30,
                                      fontFamily: Alata,
                                      paddingHorizontal: 10,
                                      textAlign: "center",
                                    }}
                                  >
                                    {"\u2713"}
                                  </Text>
                                </ImageBackground>
                              </View>
                            )}
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </View>

                <Text style={styles.middleTextCenter}>Nutritional values:</Text>
                {!moreInfo ? (
                  //
                  //
                  //LESS INFORMATION
                  //
                  //

                  <View>
                    <View style={styles.table}>
                      <View style={styles.tableColumn}>
                        <View style={styles.tableTopLeftRow}>
                          <Text style={styles.tableTopText}>
                            Nutritional {"\n"} value per:
                          </Text>
                        </View>

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
                          <Text style={styles.tableTopText}>100 gram:</Text>
                        </View>

                        {totalNutrientsArray.slice(0, 8).map((item) => {
                          const amount = (
                            (item.quantity / totalWeight) *
                            100
                          ).toFixed(2);

                          return (
                            <View key={item.label + 1} style={styles.tableRow}>
                              <Text style={styles.tableText}>
                                {renderAmount(item, amount)}
                              </Text>
                            </View>
                          );
                        })}
                      </View>

                      <View style={styles.tableColumn}>
                        <View style={styles.tableTopRow}>
                          <Text style={styles.tableTopText}>
                            portion of{"\n"}
                            {Math.round(totalWeight / portion)} gram:
                          </Text>
                        </View>

                        {totalNutrientsArray.slice(0, 8).map((item) => {
                          const amount = (item.quantity / portion).toFixed(2);
                          return (
                            <View key={item.label + 2} style={styles.tableRow}>
                              <Text style={styles.tableText}>
                                {renderAmount(item, amount)}
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
                              {item && item.quantity.toFixed(2) === number ? (
                                <Text style={styles.tableText}> - </Text>
                              ) : (
                                <Text style={styles.tableText}>
                                  {(item.quantity / portion).toFixed(2)}{" "}
                                  {item.unit}
                                </Text>
                              )}
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
                      <Text style={styles.middleTextCenter}>
                        More information{" "}
                      </Text>
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
                        <View style={styles.tableTopLeftRow}>
                          <Text style={styles.tableTopText}>
                            Nutritional {"\n"} value per:
                          </Text>
                        </View>

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
                          <Text style={styles.tableTopText}>100 gram:</Text>
                        </View>

                        {totalNutrientsArray.map((item) => {
                          const amount = (
                            (item.quantity / totalWeight) *
                            100
                          ).toFixed(2);

                          return (
                            <View key={item.label + 1} style={styles.tableRow}>
                              <Text style={styles.tableText}>
                                {renderAmount(item, amount)}
                              </Text>
                            </View>
                          );
                        })}
                      </View>

                      <View style={styles.tableColumn}>
                        <View style={styles.tableTopRow}>
                          <Text style={styles.tableTopText}>
                            portion of{"\n"}
                            {Math.round(totalWeight / portion)} gram:
                          </Text>
                        </View>

                        {totalNutrientsArray.map((item) => {
                          const amount = (item.quantity / portion).toFixed(2);
                          return (
                            <View key={item.label + 2} style={styles.tableRow}>
                              <Text style={styles.tableText}>
                                {renderAmount(item, amount)}
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
                              {item && item.quantity.toFixed(2) === number ? (
                                <Text style={styles.tableText}> - </Text>
                              ) : (
                                <Text style={styles.tableText}>
                                  {(item.quantity / portion).toFixed(2)}{" "}
                                  {item.unit}
                                </Text>
                              )}
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
                      <Text style={styles.middleTextCenter}>
                        Less information
                      </Text>
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
    backgroundColor: red,
    width: "100%",
    height: 100,
    flexDirection: "column",
    justifyContent: "center",
  },
  headerText: {
    color: darkGreen,
    fontSize: 100,
    fontFamily: Alfa,
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
    color: red,
    fontSize: 20,
    fontFamily: Alata,
    paddingHorizontal: 10,
  },
  middleTextCenter: {
    color: red,
    fontSize: 25,
    fontFamily: Alata,
    textAlign: "center",
    marginBottom: 10,
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
    fontFamily: Alata,
    color: green,
  },
  tableText: {
    fontSize: 12.5,
    fontFamily: Alata,
    color: red,
  },
});
