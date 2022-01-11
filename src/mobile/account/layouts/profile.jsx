import React from "react";
import {
  Box,
  List,
  Paper,
  Avatar,
  Hidden,
  Button,
  Divider,
  ListItem,
  Typography,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  CircularProgress,
  ListItemSecondaryAction,
} from "@mui/material";
import Confirm from "../../../shared/confirm";
import ProfileUpdate from "../component/profileUpdate";
import no_user from "../../../assets/images/no_user.png";
import PasswordUpdate from "../component/passwordUpdate";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { ChevronRightRounded } from "@mui/icons-material";
import { logout } from "../../../store/actions/userActions";
import { useTheme, alpha, styled } from "@mui/material/styles";
import { UserEditIcon, PasswordIcon } from "../../../assets/icons";

const ErrorImg = styled("img")({
  width: "16rem",
});

const MuiDivider = styled(Divider)(({ theme: { palette } }) => ({
  borderColor: palette.mode === "light" ? palette.grey[200] : alpha(palette.common.white, 0.12),
}));

const Profile = () => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.userState);

  const [logoutOpen, setLogoutOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const handleProfileOpen = () => {
    setProfileOpen(true);
  };

  const handleProfileClose = () => {
    setProfileOpen(false);
  };

  const handlePasswordOpen = () => {
    setPasswordOpen(true);
  };

  const handlePasswordClose = () => {
    setPasswordOpen(false);
  };

  const setHandlePasswordOpen = () => {
    setPasswordOpen(true);
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

  if (loading || error) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading && <CircularProgress color="primary" />}
        {error && (
          <>
            <ErrorImg src={no_user} alt="error" />
            <Typography sx={{ fontSize: "1.05rem", fontWeight: 500, mt: -2 }}>{error}</Typography>
          </>
        )}
      </Box>
    );
  }

  return (
    <>
      <Paper elevation={0} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <List>
          <ListItem sx={{ px: 2 }}>
            <ListItemAvatar>
              <Avatar
                alt={user && user.name ? user.name : ""}
                src={
                  user && user.avatar && `https://budgety-api.herokuapp.com/avatars/${user.avatar}`
                }
              />
            </ListItemAvatar>
            <ListItemText
              primary={(user && user.name && user.name) || null}
              secondary={user && user.email}
            />

            <Confirm
              open={logoutOpen}
              onSubmit={handleLogout}
              onClose={handleLogoutClose}
              title={t("logout.title")}
              description={t("logout.desc")}
            />
            <Hidden smDown>
              <ListItemSecondaryAction>
                <Button onClick={handleLogoutOpen} color="error">
                  {t("logout.title")}
                </Button>
              </ListItemSecondaryAction>
            </Hidden>
          </ListItem>
          <MuiDivider variant="fullWidth" />
          <ListItem onClick={handleProfileOpen} button>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <UserEditIcon
                size={20}
                color={palette.mode === "light" ? palette.grey[600] : palette.common.white}
              />
            </ListItemIcon>
            <ListItemText primary={t("account.update-profile")} />
            <ListItemSecondaryAction>
              <ChevronRightRounded />
            </ListItemSecondaryAction>
          </ListItem>
          <MuiDivider variant="fullWidth" />
          <ListItem onClick={handlePasswordOpen} button>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <PasswordIcon
                size={20}
                color={palette.mode === "light" ? palette.grey[600] : palette.common.white}
              />
            </ListItemIcon>
            <ListItemText primary={t("account.update-password")} />
            <ListItemSecondaryAction>
              <ChevronRightRounded />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>

      <ProfileUpdate open={profileOpen} onClose={handleProfileClose} />
      <PasswordUpdate
        open={passwordOpen}
        onClose={handlePasswordClose}
        handleOpen={setHandlePasswordOpen}
      />
    </>
  );
};

export default Profile;
