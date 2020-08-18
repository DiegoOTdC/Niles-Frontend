import { FETCH_RECIPES_SUCCESS } from "./actions";
import { REMOVE_RECIPES_SUCCESS } from "./actions";

const initialState = { imageUrl: null, recipes: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_RECIPES_SUCCESS:
      return initialState;
    case FETCH_RECIPES_SUCCESS:
      const { imageUrl, recipes } = action.payload;
      return { imageUrl: imageUrl, recipes: recipes };

    default:
      return state;
  }
};
