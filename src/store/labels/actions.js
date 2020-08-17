import axios from "axios";

export const FETCH_LABELS_SUCCESS = "FETCH_LABELS_SUCCESS";

const server = "http://192.168.178.87:4000";

export const setLabels = (labels) => ({
  type: FETCH_LABELS_SUCCESS,
  payload: labels,
});

export const fetchImageLabels = (imageUrl) => {
  return async (dispatch, getState) => {
    const response = await axios.post(`${server}/analyse/image`, {
      imageUrl,
    });
    console.log("what is responds.data for imagelabels", response.data);

    dispatch(setLabels(response.data));
  };
};

export const fetchBarcodeLabels = (barcode) => {
  console.log("what is the barcode in action", barcode);
  return async (dispatch, getState) => {
    const response = await axios.get(`${server}/analyse/barcode/${barcode}`);
    console.log("what is response", response);

    dispatch(setLabels(response.data));
  };
};
