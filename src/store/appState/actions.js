export const APP_LOADING = "APP_LOADING";
export const APP_DONE_LOADING = "APP_DONE_LOADING";
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const appLoading = () => ({ type: APP_LOADING });
export const appDoneLoading = () => ({ type: APP_DONE_LOADING });
export const clearMessage = () => ({ type: CLEAR_MESSAGE });

export const setMessage = (variant, text) => {
  return {
    type: SET_MESSAGE,
    payload: {
      variant,
      text,
    },
  };
};

export const showMessageWithTimeout = (variant, text, timeOutMilliSeconds) => {
  return (dispatch) => {
    console.log("do we get here?");
    console.log("variant", variant);
    console.log("text", text);
    console.log("time", timeOutMilliSeconds);
    dispatch(setMessage(variant, text));

    const timeout = timeOutMilliSeconds || 2000;

    console.log("what si timoeout", timeout);

    setTimeout(() => dispatch(clearMessage()), timeout);
  };
};
