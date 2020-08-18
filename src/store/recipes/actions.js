import axios from "axios";
import { server } from "@env";

export const FETCH_RECIPES_SUCCESS = "FETCH_RECIPES_SUCCESS";
export const REMOVE_RECIPES_SUCCESS = "REMOVE_RECIPES_SUCCESS";

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
