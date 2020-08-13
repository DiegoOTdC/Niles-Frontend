import axios from "axios";

const server = "http://192.168.178.87:4000";

export const getRecipes = (imageUri) => {
  console.log("imageUri in actions", imageUri);
  return async (dispatch, getState) => {
    console.log("imageuri", imageUri);
    const response = await axios.post(`${server}/recipes`, {
      imageUri,
    });
    console.log(
      "response in actions!",
      response.data.recipes.map((rec) => rec.calories)
    );
  };
};
