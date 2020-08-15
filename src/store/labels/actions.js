import axios from "axios";

export const FETCH_LABELS_SUCCESS = "FETCH_LABELS_SUCCESS";

const server = "http://192.168.178.87:4000";

export const setLabels = (labels) => ({
  type: FETCH_LABELS_SUCCESS,
  payload: labels,
});

export const fetchLabels = (imageUrl) => {
  return async (dispatch, getState) => {
    const response = await axios.post(`${server}/analyse`, {
      imageUrl,
    });
    dispatch(setLabels(response.data));
  };
};
