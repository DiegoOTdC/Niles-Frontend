import axios from "axios";
import { server } from "@env";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../appState/actions";

export const FETCH_LABELS_SUCCESS = "FETCH_LABELS_SUCCESS";
export const REMOVE_LABELS_SUCCESS = "REMOVE_LABELS_SUCCESS";

export const setLabels = (labels) => ({
  type: FETCH_LABELS_SUCCESS,
  payload: labels,
});

export const removeLabels = () => ({
  type: REMOVE_LABELS_SUCCESS,
});

export const fetchImageLabels = (imageUrl) => {
  return async (dispatch, getState) => {
    try {
      dispatch(appLoading());
      const response = await axios.post(`${server}/analyse/image`, {
        imageUrl,
      });

      if (response && response.data.message) {
        dispatch(
          showMessageWithTimeout("warning", response.data.message, 3000)
        );
      } else {
        dispatch(setLabels(response.data));
      }
    } catch (e) {
      console.log(e);
      dispatch(
        showMessageWithTimeout("danger", "sorry, something went wrong!", 3000)
      );
    }
  };
};

export const fetchBarcodeLabels = (barcode) => {
  return async (dispatch, getState) => {
    try {
      dispatch(appLoading());
      const response = await axios.get(`${server}/analyse/barcode/${barcode}`);

      if (response && response.data.message) {
        dispatch(
          showMessageWithTimeout("warning", response.data.message, 3000)
        );
      } else {
        dispatch(setLabels(response.data));
      }
      dispatch(appDoneLoading());
    } catch (e) {
      console.log("error while fetching barcodes:", e);
      dispatch(
        showMessageWithTimeout("danger", "sorry, something went wrong!", 3000)
      );
      dispatch(appDoneLoading());
    }
  };
};
