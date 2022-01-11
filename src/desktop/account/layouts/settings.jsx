import React, { useState } from "react";
import {
  Box,
  Radio,
  Divider,
  Paper,
  RadioGroup,
  Typography,
  FormControlLabel,
} from "@mui/material";

import ThemeSwitch from "../../../shared/themeSwitch";

import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import { setTheme, setLang } from "../../../store/actions/themeActions";

const Wrapper = styled(Box)(({ theme: { palette } }) => ({
  width: "20rem",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  borderLeft: `1px solid ${
    palette.mode === "light" ? palette.grey[300] : alpha(palette.common.white, 0.12)
  }`,
}));

const Header = styled(Box)(({ theme: { spacing, breakpoints } }) => ({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  paddingTop: spacing(1.5),
  paddingBottom: spacing(1.5),
  paddingLeft: spacing(3),
  paddingRight: spacing(3),
  justifyContent: "space-between",
  [breakpoints.down("sm")]: {
    paddingLeft: spacing(2.5),
    paddingRight: spacing(2.5),
  },
}));

const SettingPaper = styled(Paper)(({ theme: { palette, spacing } }) => ({
  borderRadius: spacing(2),
  backgroundColor: palette.mode === "light" ? palette.grey[200] : palette.grey[800],
}));

const Settings = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { themeMode, lang } = useSelector((state) => state.theme);

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

  return (
    <Wrapper>
      <Header>
        <Typography sx={{ fontWeight: 600 }} variant="h6">
          {t("account.settings")}
        </Typography>
      </Header>
      <Box px={3}>
        <SettingPaper elevation={0}>
          <Box pt={1.5} pb={1}>
            <Box
              sx={{
                mb: 1,
                px: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontWeight: 500 }} variant="subtitle1">
                {t("account.theme")}
              </Typography>
              <ThemeSwitch
                name="isDarkMode"
                value={setting.isDarkMode}
                checked={setting.isDarkMode}
                onChange={handleSetting}
              />
            </Box>
            <Divider />
            <Box mt={1} px={2}>
              <Typography sx={{ fontWeight: 500 }} variant="subtitle1">
                {t("account.lang")}
              </Typography>
              <RadioGroup
                name="lang"
                value={setting.lang}
                onChange={handleSetting}
                sx={{ flexDirection: "row" }}
              >
                <FormControlLabel
                  value="en"
                  label={t("account.en")}
                  control={<Radio color="primary" />}
                />
                <FormControlLabel
                  value="mm"
                  label={t("account.mm")}
                  control={<Radio color="primary" />}
                />
              </RadioGroup>
            </Box>
          </Box>
        </SettingPaper>
      </Box>
    </Wrapper>
  );
};

export default Settings;
