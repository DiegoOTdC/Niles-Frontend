import { FETCH_LABELS_SUCCESS } from "./actions";
import { REMOVE_LABELS_SUCCESS } from "./actions";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_LABELS_SUCCESS:
      return initialState;
    case FETCH_LABELS_SUCCESS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
