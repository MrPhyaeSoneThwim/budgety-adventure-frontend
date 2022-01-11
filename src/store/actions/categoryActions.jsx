import {
  RESET_ERROR,
  RESET_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_FAIL,
  ADD_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_SUCCESS,
  CATEGORY_STATS_REQUEST,
  CATEGORY_STATS_FAIL,
  CATEGORy_STATS_SUCCESS,
} from "../constants/categoryConstants";

import { setError } from "../utils/globalError";
import { Axios, getAuthConfig } from "../../http";

export const getCategories = (query) => async (dispatch, getState) => {
  dispatch({ type: GET_CATEGORIES_REQUEST });
  try {
    let filterQuery = new URLSearchParams(query).toString();
    const results = await Axios.get(
      `/categories?${filterQuery}`,
      getAuthConfig(getState().userState.token)
    );

    const { data } = await results.data;
    dispatch({ type: GET_CATEGORIES_SUCCESS, payload: { categories: data.categories } });
  } catch (error) {
    setError(GET_CATEGORIES_FAIL, error, dispatch);
  }
};

export const getCategory = (categoryId) => async (dispatch, getState) => {
  dispatch({ type: GET_CATEGORY_REQUEST });
  try {
    const results = await Axios.get(
      `/categories/${categoryId}`,
      getAuthConfig(getState().userState.token)
    );
    const { data } = await results.data;
    dispatch({ type: GET_CATEGORY_SUCCESS, payload: { category: data.category } });
  } catch (error) {
    setError(GET_CATEGORY_FAIL, error, dispatch);
  }
};

export const addCategory = (category) => async (dispatch, getState) => {
  dispatch({ type: RESET_SUCCESS });
  dispatch({ type: ADD_CATEGORY_REQUEST });
  try {
    const results = await Axios.post(
      "/categories",
      category,
      getAuthConfig(getState().userState.token)
    );
    const { data, message } = await results.data;

    dispatch({ type: ADD_CATEGORY_SUCCESS, payload: { category: data.category, message } });
  } catch (error) {
    setError(ADD_CATEGORY_FAIL, error, dispatch);
  }
};

export const deleteCategory = (categoryId) => async (dispatch, getState) => {
  dispatch({ type: RESET_SUCCESS });
  dispatch({ type: DELETE_CATEGORY_REQUEST });
  try {
    const results = await Axios.delete(
      `/categories/${categoryId}`,
      getAuthConfig(getState().userState.token)
    );
    const { message } = await results.data;
    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: { message } });
  } catch (error) {
    setError(DELETE_CATEGORY_FAIL, error, dispatch);
  }
};

export const updateCategory = (categoryId, categoryData) => async (dispatch, getState) => {
  dispatch({ type: RESET_SUCCESS });
  dispatch({ type: UPDATE_CATEGORY_REQUEST });
  try {
    const results = await Axios.put(
      `/categories/${categoryId}`,
      categoryData,
      getAuthConfig(getState().userState.token)
    );
    const { message } = await results.data;
    dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: { message } });
  } catch (error) {
    setError(UPDATE_CATEGORY_FAIL, error, dispatch);
  }
};

export const getCategoryStats = (params) => async (dispatch, getState) => {
  dispatch({ type: CATEGORY_STATS_REQUEST });
  try {
    const { month, year, type } = params;

    const results = await Axios.get(
      `categories/stats/year/${year}/month/${month}/type/${type}`,
      getAuthConfig(getState().userState.token)
    );
    const { data } = await results.data;

    dispatch({
      type: CATEGORy_STATS_SUCCESS,
      payload: { stats: data.stats, statsList: data.statsList },
    });
  } catch (error) {
    setError(CATEGORY_STATS_FAIL, error, dispatch);
  }
};

export const resetError = () => (dispatch) => {
  dispatch({ type: RESET_ERROR });
};

export const resetSuccess = () => (dispatch) => {
  dispatch({ type: RESET_SUCCESS });
};
