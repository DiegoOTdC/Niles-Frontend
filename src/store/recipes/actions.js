import axios from "axios";

export const FETCH_RECIPES_SUCCESS = "FETCH_RECIPES_SUCCESS";
export const REMOVE_RECIPES_SUCCESS = "REMOVE_RECIPES_SUCCESS";

const server = "http://192.168.178.87:4000";

export const fetchRecipes = (recipes) => ({
  type: FETCH_RECIPES_SUCCESS,
  payload: recipes,
});

export const removeRecipes = () => ({
  type: REMOVE_RECIPES_SUCCESS,
});

export const getRecipes = (foodLabel) => {
  return async (dispatch, getState) => {
    const response = await axios.post(`${server}/recipes`, {
      foodLabel,
    });

    dispatch(fetchRecipes(response.data));
  };
};
