import axios from "axios";

export const FETCH_RECIPES_SUCCESS = "FETCH_RECIPES_SUCCESS";

const server = "http://192.168.178.87:4000";

export const fetchRecipes = (recipes) => ({
  type: FETCH_RECIPES_SUCCESS,
  payload: recipes,
});

export const getRecipes = (imageUrl) => {
  return async (dispatch, getState) => {
    const response = await axios.post(`${server}/recipes`, {
      imageUrl,
    });

    dispatch(fetchRecipes(response.data));
  };
};
