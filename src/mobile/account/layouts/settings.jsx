import React, { useState } from "react";
import {
  Box,
  List,
  Radio,
  Paper,
  Hidden,
  Divider,
  ListItem,
  Typography,
  RadioGroup,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  FormControlLabel,
  ListItemSecondaryAction,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/actions/userActions";
import { useTheme, styled, alpha } from "@mui/material/styles";
import { ThemeIcon, LanguageIcon } from "../../../assets/icons";
import { setLang, setTheme } from "../../../store/actions/themeActions";

import Confirm from "../../../shared/confirm";
import LangConfig from "../component/langConfig";
import ThemeSwitch from "../../../shared/themeSwitch";

const MuiDivider = styled(Divider)(({ theme: { palette } }) => ({
  borderColor: palette.mode === "light" ? palette.grey[200] : alpha(palette.common.white, 0.12),
}));

const Settings = () => {
  const { palette, breakpoints } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isSmDown = useMediaQuery(breakpoints.down("sm"));
  const { themeMode, lang } = useSelector((state) => state.theme);

  const [langOpen, setLangOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [setting, setSetting] = useState({
    lang: lang,
    isDarkMode: themeMode === "light" ? false : true,
  });

  const handleSetting = (event) => {
    const { target } = event;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    if (name === "lang") {
      dispatch(setLang(value));
    } else {
      dispatch(setTheme(!!value ? "dark" : "light"));
    }

    // handle state for setting form components
    setSetting({ ...setting, [name]: value });
  };

  const handleLangOpen = () => {
    setLangOpen(true);
  };

  const handleLangClose = () => {
    setLangOpen(false);
  };

  const handleLogoutOpen = () => {
    setLogoutOpen(true);
  };

  const handleLogoutClose = () => {
    setLogoutOpen(false);
  };

  const handleLogout = () => {
    setLogoutOpen(false);
    dispatch(logout());
  };

  return (
    <Box mt={2}>
      <Typography>{t("account.settings")}</Typography>
      <Paper elevation={0} sx={{ mt: 1, borderRadius: 2, overflow: "hidden" }}>
        <List>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <ThemeIcon
                size={20}
                color={palette.mode === "light" ? palette.grey[700] : palette.common.white}
              />
            </ListItemIcon>
            <ListItemText primary={t("account.theme")} />
            <ListItemSecondaryAction>
              <ThemeSwitch
                name="isDarkMode"
                value={setting.isDarkMode}
                checked={setting.isDarkMode}
                onChange={handleSetting}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <MuiDivider variant="fullWidth" />
          <ListItem onClick={isSmDown ? handleLangOpen : () => {}} button={isSmDown ? true : false}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LanguageIcon
                size={20}
                color={palette.mode === "light" ? palette.grey[700] : palette.common.white}
              />
            </ListItemIcon>
            <ListItemText primary={t("account.lang")} />
            <ListItemSecondaryAction>
              <Hidden smUp>
                <Typography>{t(`account.${lang}`)}</Typography>
              </Hidden>
              <Hidden smDown>
                <RadioGroup
                  name="lang"
                  value={setting.lang}
                  onChange={handleSetting}
                  sx={{ flexDirection: "row" }}
                >
                  <FormControlLabel
                    value="en"
                    label={t("account.sm-en")}
                    control={<Radio color="primary" />}
                  />
                  <FormControlLabel
                    value="mm"
                    label={t("account.sm-mm")}
                    control={<Radio color="primary" />}
                  />
                </RadioGroup>
              </Hidden>
            </ListItemSecondaryAction>
          </ListItem>
          <LangConfig
            open={langOpen}
            lang={setting.lang}
            onClose={handleLangClose}
            handleSelect={handleSetting}
          />
        </List>
      </Paper>
      <Hidden smUp>
        <Paper elevation={0} sx={{ mt: 2, borderRadius: 1.5, py: 0, overflow: "hidden" }}>
          <List sx={{ py: 0 }}>
            <ListItem onClick={handleLogoutOpen} button>
              <ListItemText sx={{ textAlign: "center", fontWeight: 500, color: "error.main" }}>
                {t("logout.title")}
              </ListItemText>
            </ListItem>
          </List>
        </Paper>
        <Confirm
          open={logoutOpen}
          onSubmit={handleLogout}
          onClose={handleLogoutClose}
          title={t("logout.title")}
          description={t("logout.desc")}
        />
      </Hidden>
    </Box>
  );
};

export default Settings;
