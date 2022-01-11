export const setError = (type, error, dispatch) => {
  let message =
    (error.response && error.response.data.message && error.response.data.message) || error.message;

  dispatch({
    type: type,
    payload: {
      message,
    },
  });
};
