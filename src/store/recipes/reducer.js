import { FETCH_RECIPES_SUCCESS } from "./actions";

const initialState = { imageUrl: null, recipes: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECIPES_SUCCESS:
      const { imageUrl, recipes } = action.payload;
      return { imageUrl: imageUrl, recipes: recipes };
    default:
      return state;
  }
};
