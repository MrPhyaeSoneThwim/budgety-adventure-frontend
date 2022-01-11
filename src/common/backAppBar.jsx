import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTheme, alpha } from "@mui/material/styles";
import { logout } from "../store/actions/userActions";
import { ArrowBackRounded } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Box, AppBar as MuiAppBar, Toolbar, Typography, IconButton } from "@mui/material";

import React from "react";
import PropTypes from "prop-types";
import Confirm from "../shared/confirm";

const BackAppBar = ({ title, action, path }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { palette, spacing } = useTheme();

  const { isTokenExpired } = useSelector((state) => state.userState);

  const appBarStyle = {
    boxShadow: "none",
    backdropFilter: "blur(6px)",
    backgroundColor:
      palette.mode === "light" ? alpha(palette.grey[100], 0.8) : alpha(palette.grey[900], 0.8),
    transition: "background-color 250ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;",
  };

  const toolBarStyle = {
    pl: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: `${spacing(8)} !important`,
  };

  const handleBack = () => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <MuiAppBar elevation={0} position="sticky" sx={{ ...appBarStyle }}>
        <Toolbar sx={{ ...toolBarStyle }}>
          <Box sx={{ display: "inline-flex", alignItems: "center" }}>
            <IconButton onClick={handleBack}>
              <ArrowBackRounded />
            </IconButton>
            <Typography sx={{ fontWeight: 600, ml: 1.5 }} variant="h6" component="div">
              {title}
            </Typography>
          </Box>
          {action && action}
        </Toolbar>
      </MuiAppBar>
      <Confirm
        hideDismiss={true}
        open={isTokenExpired}
        onSubmit={handleLogout}
        title={t("expired.title")}
        description={t("expired.desc")}
      />
    </>
  );
};

BackAppBar.propTypes = {
  action: PropTypes.element,
};

export default BackAppBar;
