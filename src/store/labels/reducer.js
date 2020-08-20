import { FETCH_LABELS_SUCCESS } from "./actions";
import { REMOVE_LABELS_SUCCESS } from "./actions";
import { REMOVE_URL_SUCCESS } from "./actions";
import { REMOVE_MESSAGE_SUCCESS } from "./actions";
import { REMOVE_NAME_OF_PRODUCT_SUCCESS } from "./actions";

const initialState = {};

export default (state = initialState, action) => {
  console.log("what is state", state);
  switch (action.type) {
    case REMOVE_NAME_OF_PRODUCT_SUCCESS:
      return { ...state, name: null };
    case REMOVE_MESSAGE_SUCCESS:
      return { ...state, message: null };
    case REMOVE_URL_SUCCESS:
      return { ...state, url: null };
    case REMOVE_LABELS_SUCCESS:
      return { ...state, labels: null };
    case FETCH_LABELS_SUCCESS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
