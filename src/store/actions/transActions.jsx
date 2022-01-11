import {
  ADD_TRAN_FAIL,
  ADD_TRAN_REQUEST,
  ADD_TRAN_SUCCESS,
  ANNUAL_STATS_FAIL,
  ANNUAL_STATS_REQUEST,
  ANNUAL_STATS_SUCCESS,
  DELETE_TRAN_REQUEST,
  DELETE_TRAN_SUCCESS,
  GET_TRANS_FAIL,
  GET_TRANS_REQUEST,
  GET_TRANS_SUCCESS,
  GET_TRAN_FAIL,
  GET_TRAN_REQUEST,
  GET_TRAN_SUCCESS,
  MONTHLY_STATS_FAIL,
  MONTHLY_STATS_REQUEST,
  MONTHLY_STATS_SUCCESS,
  RESET_ERROR,
  RESET_SUCCESS,
  UPDATE_TRAN_FAIL,
  UPDATE_TRAN_REQUEST,
  UPDATE_TRAN_SUCCESS,
} from "../constants/transConstants";

import { setError } from "../utils/globalError";
import { Axios, getAuthConfig } from "../../http";

export const getTransactions = (query) => async (dispatch, getState) => {
  dispatch({ type: GET_TRANS_REQUEST });
  try {
    const results = await Axios.get(
      `/transactions?${new URLSearchParams(query).toString()}`,
      getAuthConfig(getState().userState.token)
    );
    const { data } = await results.data;
    dispatch({ type: GET_TRANS_SUCCESS, payload: { transactions: data.transactions } });
  } catch (error) {
    setError(GET_TRANS_FAIL, error, dispatch);
  }
};

export const getTransaction = (transactionId) => async (dispatch, getState) => {
  dispatch({ type: GET_TRAN_REQUEST });
  try {
    const results = await Axios.get(
      `/transactions/${transactionId}`,
      getAuthConfig(getState().userState.token)
    );
    const { data } = await results.data;
    dispatch({ type: GET_TRAN_SUCCESS, payload: { transaction: data.transaction } });
  } catch (error) {
    setError(GET_TRAN_FAIL, error, dispatch);
  }
};

export const addTransaction = (transactionData) => async (dispatch, getState) => {
  dispatch({ type: RESET_SUCCESS });
  dispatch({ type: ADD_TRAN_REQUEST });
  try {
    const results = await Axios.post(
      "/transactions",
      transactionData,
      getAuthConfig(getState().userState.token)
    );
    const { message } = await results.data;
    dispatch({ type: ADD_TRAN_SUCCESS, payload: { message } });
  } catch (error) {
    setError(ADD_TRAN_FAIL, error, dispatch);
  }
};

export const updateTransaction = (tranId, tranData) => async (dispatch, getState) => {
  dispatch({ type: RESET_SUCCESS });
  dispatch({ type: UPDATE_TRAN_REQUEST });
  try {
    const results = await Axios.put(
      `/transactions/${tranId}`,
      tranData,
      getAuthConfig(getState().userState.token)
    );
    const { message } = await results.data;
    dispatch({ type: UPDATE_TRAN_SUCCESS, payload: { message } });
  } catch (error) {
    setError(UPDATE_TRAN_FAIL, error, dispatch);
  }
};

export const deleteTransaction = (transactionId) => async (dispatch, getState) => {
  dispatch({ type: RESET_SUCCESS });
  dispatch({ type: DELETE_TRAN_REQUEST });
  try {
    const results = await Axios.delete(
      `/transactions/${transactionId}`,
      getAuthConfig(getState().userState.token)
    );
    const { message } = await results.data;
    dispatch({ type: DELETE_TRAN_SUCCESS, payload: { message } });
  } catch (error) {}
};

export const getMonthStats = (params) => async (dispatch, getState) => {
  dispatch({ type: MONTHLY_STATS_REQUEST });
  try {
    const { month, year } = params;
    const results = await Axios.get(
      `transactions/monthly-stats/year/${year}/month/${month}`,
      getAuthConfig(getState().userState.token)
    );
    const { data } = await results.data;
    dispatch({ type: MONTHLY_STATS_SUCCESS, payload: { stats: data.stats } });
  } catch (error) {
    setError(MONTHLY_STATS_FAIL, error, dispatch);
  }
};

export const getAnnualStats = (params) => async (dispatch, getState) => {
  dispatch({ type: ANNUAL_STATS_REQUEST });
  try {
    const { year } = params;
    const results = await Axios.get(
      `/transactions/annual-stats/year/${year}`,
      getAuthConfig(getState().userState.token)
    );
    const { data } = await results.data;
    dispatch({ type: ANNUAL_STATS_SUCCESS, payload: { stats: data.stats } });
  } catch (error) {
    setError(ANNUAL_STATS_FAIL, error, dispatch);
  }
};

export const resetError = () => (dispatch) => {
  dispatch({ type: RESET_ERROR });
};

export const resetSuccess = () => (dispatch) => {
  dispatch({ type: RESET_SUCCESS });
};
