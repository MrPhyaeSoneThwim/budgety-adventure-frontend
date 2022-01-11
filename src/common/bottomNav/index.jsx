import React from "react";
import NavLink from "./navLink";
import Confirm from "../../shared/confirm";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Paper, BottomNavigation } from "@mui/material";
import { logout } from "../../store/actions/userActions";
import { bottomNavOptions } from "../../utils/constants";
import { useLocation, matchPath } from "react-router-dom";
import { styled, alpha, useTheme } from "@mui/material/styles";

const BottomNav = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const { isTokenExpired } = useSelector((state) => state.userState);

  const match = (path) =>
    path ? !!matchPath({ path, exact: true, strict: true }, pathname) : false;

  const [value, setValue] = React.useState(pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const PaperStyle = styled(Paper)({
    borderRadius: 0,
    backdropFilter: "blur(6px)",
    backgroundColor:
      palette.mode === "light" ? alpha(palette.common.white, 0.8) : alpha(palette.grey[900], 0.8),
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <PaperStyle sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation showLabels value={value} onChange={handleChange}>
          {bottomNavOptions.map((item) => (
            <NavLink key={item.title} item={item} active={match} />
          ))}
        </BottomNavigation>
      </PaperStyle>
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

export default BottomNav;
