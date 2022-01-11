import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LogoutIcon } from "../../assets/icons";
import { styled, alpha } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { sideNavOptions } from "../../utils/constants";
import { logout } from "../../store/actions/userActions";
import { matchPath, useLocation } from "react-router-dom";

import { Box, List, ListSubheader, Typography, Hidden } from "@mui/material";

import SideLink from "./sideLink";
import Confirm from "../../shared/confirm";
import wallet from "../../assets/images/wallet.svg";

const SideBarLayout = styled(Box)(({ theme: { spacing, breakpoints, palette } }) => ({
  width: "16rem",
  height: "100vh",
  [breakpoints.down("lg")]: {
    width: "4rem",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  paddingTop: spacing(2),
  paddingBottom: spacing(2),
  borderRight: `1px solid ${
    palette.mode === "light" ? palette.grey[300] : alpha(palette.common.white, 0.12)
  }`,
}));

const AppLogo = styled(Box)(({ theme: { spacing, breakpoints } }) => ({
  display: "flex",
  alignItems: "center",
  paddingLeft: spacing(2),
  paddingRight: spacing(2),
  [breakpoints.down("lg")]: {
    paddingLeft: spacing(1.25),
  },
}));

const Logo = styled("img")(({ theme: { spacing } }) => ({
  width: spacing(4),
}));

const AppName = styled(Typography)(({ theme: { spacing, breakpoints } }) => ({
  fontWeight: 600,
  marginBottom: "-3px",
  marginLeft: spacing(2),
  [breakpoints.down("lg")]: {
    display: "none",
  },
}));

export default function SideBar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { isTokenExpired } = useSelector((state) => state.userState);

  const match = (path) =>
    path ? !!matchPath({ path, exact: true, strict: true }, pathname) : false;

  const [logoutOpen, setLogoutOpen] = useState(false);
  const handleLogoutOpen = () => {
    setLogoutOpen(true);
  };
  const handleLogoutClose = () => {
    setLogoutOpen(false);
  };

  const ListSubHeaderStyle = styled(ListSubheader)(
    ({ theme: { spacing, breakpoints, palette } }) => ({
      fontWeight: 700,
      lineHeight: "1.5",
      fontSize: "0.75rem",
      backgroundColor: palette.background.default,
      textTransform: "uppercase",
      paddingBottom: spacing(1),
      paddingTop: spacing(1),
      paddingLeft: spacing(2),
      [breakpoints.down("lg")]: {
        visibility: "hidden",
      },
    })
  );

  const ListStyle = styled(List)(({ theme: { breakpoints } }) => ({
    [breakpoints.down("lg")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Hidden mdDown>
      <SideBarLayout>
        <AppLogo direction="row" spacing={2}>
          <Logo src={wallet} alt="Budgety Logo" />
          <AppName color="primary" variant="h6">
            Budgety
          </AppName>
        </AppLogo>
        <Box>
          <ListStyle sx={{ mt: 2 }} disablePadding>
            <ListSubHeaderStyle>Menu</ListSubHeaderStyle>
            {sideNavOptions.map((item) => (
              <SideLink key={item.title} type="link" item={item} active={match} />
            ))}
            <SideLink
              type="button"
              onClick={handleLogoutOpen}
              item={{ title: t("sideNav.logout"), icon: <LogoutIcon /> }}
            />
          </ListStyle>
          <Confirm
            open={logoutOpen}
            onSubmit={handleLogout}
            onClose={handleLogoutClose}
            title={t("logout.title")}
            description={t("logout.desc")}
          />
        </Box>
      </SideBarLayout>

      <Confirm
        hideDismiss={true}
        open={isTokenExpired}
        onSubmit={handleLogout}
        title={t("expired.title")}
        description={t("expired.desc")}
      />
    </Hidden>
  );
}
