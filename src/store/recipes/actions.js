import axios from "axios";
import { server } from "@env";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../appState/actions";

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
    try {
      const response = await axios.post(`${server}/recipes`, {
        foodLabel,
      });

      if (response && response.data.recipes.message) {
        dispatch(
          showMessageWithTimeout("warning", response.data.recipes.message, 3000)
        );
      } else {
        dispatch(fetchRecipes(response.data));
      }
    } catch (e) {
      console.log(e);
      dispatch(
        showMessageWithTimeout("danger", "Sorry, something went wrong!", 3000)
      );
    }
  };
};
