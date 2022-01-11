import {
  GET_WALLETS_REQUEST,
  GET_WALLET_FAIL,
  GET_WALLETS_SUCCESS,
  GET_WALLET_REQUEST,
  GET_WALLETS_FAIL,
  GET_WALLET_SUCCESS,
  ADD_WALLET_REQUEST,
  ADD_WALLET_FAIL,
  ADD_WALLET_SUCCESS,
  UPDATE_WALLET_REQUEST,
  UPDATE_WALLET_SUCCESS,
  UPDATE_WALLET_FAIL,
  DELETE_WALLET_REQUEST,
  DELETE_WALLET_SUCCESS,
  DELETE_WALLET_FAIL,
  RESET_SUCCESS,
  RESET_ERROR,
  GET_STATS_REQUEST,
  GET_STATS_FAIL,
  GET_STATS_SUCCESS,
  RESET_STATS,
  RESET_GET_ERROR,
} from "../constants/walletConstants";

const initialState = {
  wallets: [],
  walletsError: "",
  walletsLoading: false,

  wallet: null,
  getError: "",
  getLoading: false,

  error: "",
  success: "",
  loading: false,

  stats: null,
  transactions: [],
  statsError: "",
  statsLoading: "",
};

const WalletReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WALLETS_REQUEST:
      return {
        ...state,
        walletsLoading: true,
      };
    case GET_WALLETS_SUCCESS:
      return {
        ...state,
        walletsLoading: false,
        wallets: action.payload.wallets,
      };
    case GET_WALLETS_FAIL:
      return {
        ...state,
        walletsLoading: false,
        walletsError: action.payload.message,
      };
    case GET_WALLET_REQUEST:
      return {
        ...state,
        getLoading: true,
      };
    case GET_WALLET_FAIL:
      return {
        ...state,
        getLoading: false,
        getError: action.payload.message,
      };
    case GET_WALLET_SUCCESS:
      return {
        ...state,
        getLoading: false,
        wallet: action.payload.wallet,
      };
    case ADD_WALLET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_WALLET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case ADD_WALLET_SUCCESS:
      return {
        ...state,
        walletsError: "",
        loading: false,
        success: action.payload.message,
        wallets: [...state.wallets, action.payload.wallet],
      };
    case UPDATE_WALLET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_WALLET_SUCCESS:
      let wallets = [...state.wallets];
      return {
        ...state,
        error: "",
        success: action.payload.message,
        wallets: wallets.map((wallet) =>
          wallet._id !== action.payload.wallet._id ? wallet : action.payload.wallet
        ),
        loading: false,
      };
    case UPDATE_WALLET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case DELETE_WALLET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_WALLET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case DELETE_WALLET_SUCCESS:
      let existWallets = [...state.wallets];
      return {
        ...state,
        loading: false,
        success: action.payload.message,
        wallets: existWallets.filter((wallet) => wallet._id !== action.payload.walletId),
      };
    case GET_STATS_REQUEST:
      return {
        ...state,
        statsError: "",
        statsLoading: true,
      };
    case GET_STATS_FAIL:
      return {
        ...state,
        statsLoading: false,
        statsError: action.payload.message,
      };
    case GET_STATS_SUCCESS:
      return {
        ...state,
        statsLoading: false,
        stats: action.payload.stats,
        transactions: action.payload.transactions,
      };
    case RESET_STATS:
      return {
        ...state,
        stats: null,
        statsError: "",
        transactions: [],
      };
    case RESET_GET_ERROR:
      return {
        ...state,
        getError: "",
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

export default WalletReducer;
