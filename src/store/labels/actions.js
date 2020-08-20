import axios from "axios";
import { server } from "@env";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../appState/actions";

export const FETCH_LABELS_SUCCESS = "FETCH_LABELS_SUCCESS";
export const REMOVE_LABELS_SUCCESS = "REMOVE_LABELS_SUCCESS";
export const REMOVE_URL_SUCCESS = "REMOVE_URL_SUCCESS";
export const REMOVE_MESSAGE_SUCCESS = "REMOVE_MESSAGE_SUCCESS";
export const REMOVE_NAME_OF_PRODUCT_SUCCESS = "REMOVE_NAME_OF_PRODUCT_SUCCESS";

export const setLabels = (labels) => ({
  type: FETCH_LABELS_SUCCESS,
  payload: labels,
});

export const removeLabels = () => ({
  type: REMOVE_LABELS_SUCCESS,
});

export const removeNameOfProduct = () => ({
  type: REMOVE_NAME_OF_PRODUCT_SUCCESS,
});

export const removeMessage = () => ({
  type: REMOVE_MESSAGE_SUCCESS,
});

export const removeUrl = () => ({
  type: REMOVE_URL_SUCCESS,
});

export const fetchImageLabels = (imageUrl) => {
  return async (dispatch, getState) => {
    const response = await axios.post(`${server}/analyse/image`, {
      imageUrl,
    });
    dispatch(setLabels(response.data));
  };
};

export const fetchBarcodeLabels = (barcode) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${server}/analyse/barcode/${barcode}`);

      console.log("what is in the response?", response.data);
      if (response && response.data.message) {
        console.log("do we get here?");
        dispatch(
          showMessageWithTimeout("warning", response.data.message, 3000)
        );
      } else {
        console.log("or here?");
        dispatch(setLabels(response.data));
      }
    } catch (e) {
      console.log("error while fetching barcodes:", e);
    }
  };
};
