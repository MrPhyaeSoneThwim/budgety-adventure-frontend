import { getTheme } from "./theme";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setExpired } from "./store/actions/userActions";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { getUser, logout } from "./store/actions/userActions";

import Routes from "./routes";
import jwtDecode from "jwt-decode";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import BasicChartStyle from "./chart/basicChartStyle";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

function App() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { themeMode, lang } = useSelector((state) => state.theme);
  const { token, isTokenExpired } = useSelector((state) => state.userState);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  useEffect(() => {
    let expiredTimeout;
    if (token) {
      const decode = jwtDecode(token);
      const currentTime = Math.floor(new Date().getTime() / 1000) + 5;
      const expiredIn = (decode.exp - currentTime) * 1000;

      if (expiredIn > 0) {
        expiredTimeout = setTimeout(() => {
          dispatch(setExpired());
        }, expiredIn);
      } else {
        dispatch(setExpired());
      }
    } else {
      dispatch(logout());
    }
    // clear all timing function
    return () => {
      clearTimeout(expiredTimeout);
    };
  }, [token, dispatch]);

  useEffect(() => {
    if (token && !isTokenExpired) {
      dispatch(getUser());
    }
  }, [dispatch, token, isTokenExpired]);

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <BasicChartStyle />
        <Routes />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
