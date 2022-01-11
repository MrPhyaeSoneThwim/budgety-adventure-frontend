import {
  RESET_ERROR,
  RESET_SUCCESS,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_SUCCESS,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_SUCCESS,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  CATEGORY_STATS_REQUEST,
  CATEGORY_STATS_FAIL,
  CATEGORy_STATS_SUCCESS,
} from "../constants/categoryConstants";

const initialState = {
  categories: [],
  getAllError: "",
  getAllLoading: false,

  category: null,
  getLoading: false,
  getError: "",

  loading: false,
  success: "",
  error: "",

  stats: null,
  statsList: [],
  statsError: "",
  statsLoading: false,
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        getAllError: "",
        getAllLoading: true,
      };
    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        getAllLoading: false,
        getAllError: action.payload.message,
      };
    case CATEGORY_STATS_REQUEST:
      return {
        ...state,
        stats: null,
        statsError: "",
        statsLoading: true,
      };
    case CATEGORY_STATS_FAIL:
      return {
        ...state,
        statsLoading: false,
        statsError: action.payload.message,
      };
    case CATEGORy_STATS_SUCCESS:
      return {
        ...state,
        statsLoading: false,
        stats: action.payload.stats,
        statsList: action.payload.statsList,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        getAllError: "",
        getAllLoading: false,
        categories: action.payload.categories,
      };
    case GET_CATEGORY_REQUEST:
      return {
        ...state,
        getError: "",
        getLoading: true,
      };
    case GET_CATEGORY_FAIL:
      return {
        ...state,
        getLoading: false,
        getError: action.payload.message,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        getError: "",
        getLoading: false,
        category: action.payload.category,
      };
    case ADD_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        success: action.payload.message,
      };
    case ADD_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        success: action.payload.message,
      };
    case UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        success: action.payload.message,
      };
    case UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
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

export default CategoryReducer;
