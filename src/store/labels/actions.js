import axios from "axios";

export const FETCH_LABELS_SUCCESS = "FETCH_LABELS_SUCCESS";
export const REMOVE_LABELS_SUCCESS = "REMOVE_LABELS_SUCCESS";

const server = "http://192.168.178.87:4000";

export const setLabels = (labels) => ({
  type: FETCH_LABELS_SUCCESS,
  payload: labels,
});

export const removeLabels = () => ({
  type: REMOVE_LABELS_SUCCESS,
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
