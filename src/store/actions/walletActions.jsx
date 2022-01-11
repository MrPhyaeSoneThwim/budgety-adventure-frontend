import { Axios, getAuthConfig } from "../../http";
import {
  GET_WALLETS_REQUEST,
  GET_WALLETS_FAIL,
  GET_WALLETS_SUCCESS,
  GET_WALLET_REQUEST,
  GET_WALLET_FAIL,
  GET_WALLET_SUCCESS,
  UPDATE_WALLET_REQUEST,
  UPDATE_WALLET_FAIL,
  UPDATE_WALLET_SUCCESS,
  RESET_ERROR,
  RESET_SUCCESS,
  ADD_WALLET_REQUEST,
  ADD_WALLET_FAIL,
  ADD_WALLET_SUCCESS,
  DELETE_WALLET_REQUEST,
  DELETE_WALLET_SUCCESS,
  DELETE_WALLET_FAIL,
  GET_STATS_REQUEST,
  GET_STATS_FAIL,
  GET_STATS_SUCCESS,
  RESET_STATS,
  RESET_GET_ERROR,
} from "../constants/walletConstants";
import { setError } from "../utils/globalError";

export const getWallets = () => async (dispatch, getState) => {
  dispatch({ type: GET_WALLETS_REQUEST });
  try {
    const results = await Axios.get("/wallets", getAuthConfig(getState().userState.token));
    const { data } = await results.data;
    dispatch({ type: GET_WALLETS_SUCCESS, payload: { wallets: data.wallets } });
  } catch (error) {
    setError(GET_WALLETS_FAIL, error, dispatch);
  }
};

export const getWallet = (walletId) => async (dispatch, getState) => {
  dispatch({ type: GET_WALLET_REQUEST });
  try {
    const results = await Axios.get(
      `/wallets/get-stats/${walletId}/type/detail`,
      getAuthConfig(getState().userState.token)
    );
    const { data } = await results.data;
    dispatch({ type: GET_WALLET_SUCCESS, payload: { wallet: data.stats } });
  } catch (error) {
    setError(GET_WALLET_FAIL, error, dispatch);
  }
};

export const getWalletStat = (walletId) => async (dispatch, getState) => {
  dispatch({ type: GET_STATS_REQUEST });
  try {
    const results = await Axios.get(
      `/wallets/get-stats/${walletId}/type/stats`,
      getAuthConfig(getState().userState.token)
    );
    const { data } = await results.data;
    dispatch({
      type: GET_STATS_SUCCESS,
      payload: { stats: data.stats, transactions: data.transactions },
    });
  } catch (error) {
    setError(GET_STATS_FAIL, error, dispatch);
  }
};

export const resetWalletStat = () => (dispatch) => {
  dispatch({ type: RESET_STATS });
};

export const addWallet = (walletData) => async (dispatch, getState) => {
  dispatch({ type: ADD_WALLET_REQUEST });
  try {
    const results = await Axios.post(
      "/wallets",
      walletData,
      getAuthConfig(getState().userState.token)
    );
    const { data, message } = await results.data;
    dispatch({ type: ADD_WALLET_SUCCESS, payload: { wallet: data.wallet, message } });
  } catch (error) {
    dispatch(ADD_WALLET_FAIL, error, dispatch);
  }
};

export const updateWallet = (walletId, walletData) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_WALLET_REQUEST });
  try {
    const results = await Axios.put(
      `/wallets/${walletId}`,
      walletData,
      getAuthConfig(getState().userState.token)
    );
    const { data, message } = results.data;
    dispatch({
      type: UPDATE_WALLET_SUCCESS,
      payload: {
        message,
        wallet: data.wallet,
      },
    });
  } catch (error) {
    setError(UPDATE_WALLET_FAIL, error, dispatch);
  }
};

export const deleteWallet = (walletId) => async (dispatch, getState) => {
  dispatch({ type: DELETE_WALLET_REQUEST });
  try {
    const results = await Axios.delete(
      `/wallets/${walletId}`,
      getAuthConfig(getState().userState.token)
    );
    const { message } = await results.data;
    dispatch({ type: DELETE_WALLET_SUCCESS, payload: { walletId, message } });
  } catch (error) {
    dispatch(DELETE_WALLET_FAIL, error, dispatch);
  }
};

export const resetGetError = () => (dispatch) => {
  dispatch({ type: RESET_GET_ERROR });
};

export const resetError = () => (dispatch) => {
  dispatch({ type: RESET_ERROR });
};

export const resetSuccess = () => (dispatch) => {
  dispatch({ type: RESET_SUCCESS });
};
