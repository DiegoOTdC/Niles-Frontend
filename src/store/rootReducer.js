import { combineReducers } from "redux";
import recipesReducer from "./recipes/reducer";
import labelsReducer from "./labels/reducer";

export default combineReducers({
  recipes: recipesReducer,
  labels: labelsReducer,
});
