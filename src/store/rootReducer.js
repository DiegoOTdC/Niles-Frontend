import { combineReducers } from "redux";
import recipesReducer from "./recipes/reducer";
import labelsReducer from "./labels/reducer";
import userReducer from "./user/reducer";

export default combineReducers({
  recipes: recipesReducer,
  labels: labelsReducer,
  user: userReducer,
});
