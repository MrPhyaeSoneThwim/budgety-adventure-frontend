import {
  GET_TRANS_REQUEST,
  GET_TRANS_SUCCESS,
  GET_TRANS_FAIL,
  GET_TRAN_REQUEST,
  GET_TRAN_FAIL,
  GET_TRAN_SUCCESS,
  ADD_TRAN_SUCCESS,
  ADD_TRAN_REQUEST,
  ADD_TRAN_FAIL,
  UPDATE_TRAN_REQUEST,
  UPDATE_TRAN_FAIL,
  UPDATE_TRAN_SUCCESS,
  DELETE_TRAN_REQUEST,
  DELETE_TRAN_SUCCESS,
  DELETE_TRAN_FAIL,
  MONTHLY_STATS_REQUEST,
  MONTHLY_STATS_FAIL,
  MONTHLY_STATS_SUCCESS,
  ANNUAL_STATS_REQUEST,
  ANNUAL_STATS_FAIL,
  ANNUAL_STATS_SUCCESS,
  RESET_SUCCESS,
  RESET_ERROR,
} from "../constants/transConstants";

const initialState = {
  transactions: [],
  getTransError: "",
  getTransLoading: true,

  transaction: null,
  getTranError: "",
  getTranLoading: false,

  loading: false,
  success: "",
  error: "",

  monthStats: null,
  monthStatsLoading: false,
  monthStatsError: "",

  annualStats: null,
  annualStatsLoading: false,
  annualStatsError: "",
};

const TransReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANS_REQUEST:
      return {
        ...state,
        getTransLoading: true,
      };
    case GET_TRANS_SUCCESS:
      return {
        ...state,
        getTransError: "",
        getTransLoading: false,
        transactions: action.payload.transactions,
      };
    case GET_TRANS_FAIL:
      return {
        ...state,
        getTransLoading: false,
        getTransError: action.payload.message,
      };
    case GET_TRAN_REQUEST:
      return {
        ...state,
        getTranError: "",
        getTranLoading: true,
      };
    case GET_TRAN_FAIL:
      return {
        ...state,
        getTranLoading: false,
        getTranError: action.payload.message,
      };
    case GET_TRAN_SUCCESS:
      return {
        ...state,
        getTranLoading: false,
        transaction: action.payload.transaction,
      };
    case ADD_TRAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_TRAN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.message,
      };
    case ADD_TRAN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case UPDATE_TRAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_TRAN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case UPDATE_TRAN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.message,
      };
    case DELETE_TRAN_REQUEST:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case DELETE_TRAN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case DELETE_TRAN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.message,
      };
    case MONTHLY_STATS_REQUEST:
      return {
        ...state,
        monthStats: null,
        monthStatsError: "",
        monthStatsLoading: true,
      };
    case MONTHLY_STATS_FAIL:
      return {
        ...state,
        monthStatsLoading: false,
        monthStatsError: action.payload.message,
      };
    case MONTHLY_STATS_SUCCESS:
      return {
        ...state,
        monthStatsLoading: false,
        monthStats: action.payload.stats,
      };
    case ANNUAL_STATS_REQUEST:
      return {
        ...state,
        annualStats: null,
        annualStatsError: "",
        annualStatsLoading: true,
      };
    case ANNUAL_STATS_FAIL:
      return {
        ...state,
        annualStatsLoading: false,
        annualStatsError: action.payload.message,
      };
    case ANNUAL_STATS_SUCCESS:
      return {
        ...state,
        annualStatsError: "",
        annualStatsLoading: false,
        annualStats: action.payload.stats,
      };
    case RESET_SUCCESS:
      return {
        ...state,
        success: "",
      };
    case RESET_ERROR:
      return {
        ...state,
        error: "",
      };

    default:
      return state;
  }
};

export default TransReducer;
