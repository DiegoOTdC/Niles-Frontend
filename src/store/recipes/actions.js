import axios from "axios";

const server = "https://192.168.178.87:4000";

export const getRecipes = (imageUri) => {
  console.log("imageUri in actions", imageUri);
  return async (dispatch, getState) => {
    console.log("imageuri", imageUri);
    const response = await axios.post(`${server}/recipes`, {
      imageUri,
    });
    console.log("response", response);
  };
};
