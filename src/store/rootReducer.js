import { combineReducers } from "redux";
import recipesReducer from "./recipes/reducer";

export default combineReducers({ recipes: recipesReducer });
