import { FETCH_LABELS_SUCCESS } from "./actions";
import { REMOVE_LABELS_SUCCESS } from "./actions";
import { REMOVE_URL_SUCCESS } from "./actions";
import { REMOVE_MESSAGE_SUCCESS } from "./actions";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_MESSAGE_SUCCESS:
      return { ...state, message: null };
    case REMOVE_URL_SUCCESS:
      console.log("state before deleting url", state);
      return { ...state, url: null };
    case REMOVE_LABELS_SUCCESS:
      console.log("what is state, before deleting labels?", state);
      return { ...state, labels: null };
    case FETCH_LABELS_SUCCESS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
