import { Axios, getAuthConfig } from "../../http";
import { setError } from "../utils/globalError";
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  RESET_ERROR,
  RESET_SUCCESS,
  SET_EXPIRED,
  SET_LOGOUT,
  SEND_OTP_SUCCESS,
  OTP_REQUEST,
  OTP_FAIL,
  RESET_OTP_ERROR,
  RESET_OTP_SUCCESS,
  RESEND_OTP_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  RESET_PROFILE_ERROR,
  RESET_PROFILE_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PASS_REQUEST,
  UPDATE_PASS_SUCCESS,
  UPDATE_PASS_FAIL,
} from "../constants/userConstants";

export const login = (formData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const results = await Axios.post("/users/login", formData);
    const { data, message, token } = await results.data;
    let payload = {
      user: data.user,
    };

    if (token && payload.user.active) {
      localStorage.setItem("token", token);
      payload.token = token;
    } else {
      payload.message = message;
    }
    dispatch({ type: LOGIN_SUCCESS, payload });
  } catch (error) {
    setError(LOGIN_FAIL, error, dispatch);
  }
};

export const signup = (formData) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const results = await Axios.post("/users/signup", formData);
    const { data, message } = await results.data;

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: {
        message,
        user: data.user,
      },
    });
  } catch (error) {
    setError(SIGNUP_FAIL, error, dispatch);
  }
};

export const sendOtp = (formData) => async (dispatch) => {
  dispatch({ type: OTP_REQUEST });
  try {
    const results = await Axios.post("/users/verify-otp", formData);
    const { data, message, token } = await results.data;
    dispatch({ type: SEND_OTP_SUCCESS, payload: { user: data.user, message, token } });
  } catch (error) {
    setError(OTP_FAIL, error, dispatch);
  }
};

export const resendOtp = (userId) => async (dispatch) => {
  dispatch({ type: OTP_REQUEST });
  try {
    const results = await Axios.post(`/users/resend-otp/${userId}`);
    const { message } = await results.data;
    dispatch({ type: RESEND_OTP_SUCCESS, payload: { message } });
  } catch (error) {
    setError(OTP_FAIL, error, dispatch);
  }
};

export const getUser = () => async (dispatch, getState) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const results = await Axios.get("/users/get-me", getAuthConfig(getState().userState.token));
    const { data } = await results.data;
    dispatch({ type: GET_USER_SUCCESS, payload: { user: data.user } });
  } catch (error) {
    setError(GET_USER_FAIL, error, dispatch);
  }
};

export const updateProfile = (profileData) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const results = await Axios.put(
      "/users/update-me",
      profileData,
      getAuthConfig(getState().userState.token)
    );
    const { data, message } = await results.data;
    dispatch({ type: UPDATE_USER_SUCCESS, payload: { user: data.user, message } });
  } catch (error) {
    setError(UPDATE_USER_FAIL, error, dispatch);
  }
};

export const updatePassword = (passwordData) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_PASS_REQUEST });
  try {
    const results = await Axios.put(
      "/users/update-password",
      passwordData,
      getAuthConfig(getState().userState.token)
    );
    const { message } = await results.data;
    dispatch({ type: UPDATE_PASS_SUCCESS, payload: { message } });
  } catch (error) {
    setError(UPDATE_PASS_FAIL, error, dispatch);
  }
};

export const resetSuccess = () => (dispatch) => {
  dispatch({ type: RESET_SUCCESS });
};

export const resetOtpError = () => (dispatch) => {
  dispatch({ type: RESET_OTP_ERROR });
};

export const resetOtpSuccess = () => (dispatch) => {
  dispatch({ type: RESET_OTP_SUCCESS });
};

export const resetError = () => (dispatch) => {
  dispatch({ type: RESET_ERROR });
};

export const resetProfileError = () => (dispatch) => {
  dispatch({ type: RESET_PROFILE_ERROR });
};

export const resetProfileSuccess = () => (dispatch) => {
  dispatch({ type: RESET_PROFILE_SUCCESS });
};

export const resetPasswordError = () => (dispatch) => {
  dispatch({ type: RESET_PASSWORD_ERROR });
};

export const resetPasswordSuccess = () => (dispatch) => {
  dispatch({ type: RESET_PASSWORD_SUCCESS });
};

export const setExpired = () => (dispatch) => {
  dispatch({ type: SET_EXPIRED });
};

export const logout = () => (dispatch) => {
  dispatch({ type: SET_LOGOUT });
};
