import { SET_THEME, SET_LANG } from "../constants/themeConstants";

const lang = localStorage.getItem("lang");
const theme = localStorage.getItem("themeMode");

const initialState = {
  lang: lang ? lang : "en",
  themeMode: theme ? theme : "light",
};

const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        themeMode: action.payload.theme,
      };
    case SET_LANG:
      return {
        ...state,
        lang: action.payload.lang,
      };
    default:
      return state;
  }
};

export default ThemeReducer;
