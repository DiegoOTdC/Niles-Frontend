import axios from "axios";
import { server } from "@env";

export const FETCH_LABELS_SUCCESS = "FETCH_LABELS_SUCCESS";
export const REMOVE_LABELS_SUCCESS = "REMOVE_LABELS_SUCCESS";
export const REMOVE_URL_SUCCESS = "REMOVE_URL_SUCCESS";
export const REMOVE_MESSAGE_SUCCESS = "REMOVE_MESSAGE_SUCCESS";

export const setLabels = (labels) => ({
  type: FETCH_LABELS_SUCCESS,
  payload: labels,
});

export const removeLabels = () => ({
  type: REMOVE_LABELS_SUCCESS,
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
    const response = await axios.get(`${server}/analyse/barcode/${barcode}`);
    dispatch(setLabels(response.data));
  };
};
