import {
  SIGNUP_REQUEST,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  OTP_REQUEST,
  SEND_OTP_SUCCESS,
  OTP_FAIL,
  SET_EXPIRED,
  SET_LOGOUT,
  RESET_ERROR,
  RESET_SUCCESS,
  RESET_OTP_ERROR,
  RESET_OTP_SUCCESS,
  RESEND_OTP_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_FAIL,
  GET_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_PASS_REQUEST,
  UPDATE_PASS_FAIL,
  UPDATE_PASS_SUCCESS,
  RESET_PROFILE_ERROR,
  RESET_PROFILE_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
} from "../constants/userConstants";

const token = localStorage.getItem("token");

const initialState = {
  user: null,
  error: "",
  success: "",
  loading: false,
  otpError: "",
  otpSuccess: "",
  optLoading: false,
  token: token ? token : null,
  isTokenExpired: token ? false : true,
  isAuthenticated: token ? true : false,

  // properties used while updating profile
  profileLoading: false,
  profileError: "",
  profileSuccess: "",

  // properties used while updating password
  passwordLoading: false,
  passwordError: "",
  passwordSuccess: "",
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        user: action.payload.user,
        isTokenExpired: action.payload.token ? false : true,
        isAuthenticated: action.payload.token ? true : false,
        token: action.payload.token ? action.payload.token : null,
        success: action.payload.token ? "" : action.payload.message,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        user: action.payload.user,
        success: action.payload.message,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case OTP_REQUEST:
      return {
        ...state,
        otpError: "",
        otpLoading: true,
      };
    case OTP_FAIL:
      return {
        ...state,
        otpLoading: false,
        otpError: action.payload.message,
      };
    case SEND_OTP_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        otpError: "",
        otpLoading: false,
        isAuthenticated: true,
        isTokenExpired: false,
        user: action.payload.user,
        token: action.payload.token,
        otpSuccess: action.payload.message,
      };
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        user: action.payload.user,
      };
    case RESEND_OTP_SUCCESS:
      return {
        ...state,
        otpLoading: false,
        otpSuccess: action.payload.message,
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        profileLoading: true,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        profileLoading: false,
        profileError: action.payload.message,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        profileError: "",
        profileLoading: false,
        user: action.payload.user,
        profileSuccess: action.payload.message,
      };
    case UPDATE_PASS_REQUEST:
      return {
        ...state,
        passwordLoading: true,
      };
    case UPDATE_PASS_SUCCESS:
      return {
        ...state,
        passwordError: "",
        passwordLoading: false,
        passwordSuccess: action.payload.message,
      };
    case UPDATE_PASS_FAIL:
      return {
        ...state,
        passwordSuccess: "",
        passwordLoading: false,
        passwordError: action.payload.message,
      };
    case RESET_PROFILE_ERROR:
      return {
        ...state,
        profileError: "",
      };
    case RESET_PROFILE_SUCCESS:
      return {
        ...state,
        profileSuccess: "",
      };
    case RESET_OTP_ERROR: {
      return {
        ...state,
        otpError: "",
      };
    }
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        passwordError: "",
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        passwordSuccess: "",
      };
    case RESET_OTP_SUCCESS: {
      return {
        ...state,
        otpSuccess: "",
      };
    }
    case RESET_ERROR:
      return {
        ...state,
        error: "",
      };
    case RESET_SUCCESS:
      return {
        ...state,
        success: "",
      };
    case SET_EXPIRED: {
      return {
        ...state,
        isTokenExpired: true,
      };
    }
    case SET_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        error: "",
        isTokenExpired: true,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
export default UserReducer;
