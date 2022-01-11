import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from "redux";

import UserReducer from "./reducers/userReducer";
import ThemeReducer from "./reducers/themeReducer";
import TransReducer from "./reducers/transReducers";
import WalletReducer from "./reducers/walletReducer";
import CategoryReducer from "./reducers/categoryReducer";

const reducer = combineReducers({
  theme: ThemeReducer,
  userState: UserReducer,
  transState: TransReducer,
  walletState: WalletReducer,
  categoryState: CategoryReducer,
});

const middleware = [thunk];
const initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
