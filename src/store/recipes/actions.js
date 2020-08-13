import axios from "axios";

export const FETCH_RECIPES_SUCCESS = "FETCH_RECIPES_SUCCESS";

const server = "http://192.168.178.87:4000";

export const fetchRecipes = (recipes) => ({
  type: FETCH_RECIPES_SUCCESS,
  payload: recipes,
});

export const getRecipes = (imageUrl) => {
  console.log("imageUri in actions", imageUrl);
  return async (dispatch, getState) => {
    console.log("imageuri", imageUrl);
    const response = await axios.post(`${server}/recipes`, {
      imageUrl,
    });
    console.log("The entire repsonse", response);

    console.log(
      "response in actions!",
      response.data.recipes.map((rec) => rec.calories)
    );

    dispatch(fetchRecipes(response.data));
  };
};
