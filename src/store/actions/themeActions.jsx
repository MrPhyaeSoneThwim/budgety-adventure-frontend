import { SET_LANG, SET_THEME } from "../constants/themeConstants";

export const setTheme = (theme) => (dispatch) => {
  localStorage.setItem("themeMode", theme);
  dispatch({ type: SET_THEME, payload: { theme } });
};

export const setLang = (lang) => (dispatch) => {
  localStorage.setItem("lang", lang);
  dispatch({ type: SET_LANG, payload: { lang } });
};
