import React from "react";
import ScrollBar from "../../../shared/scrollBar";
import ProfileUpdate from "../components/profileUpdate";
import PasswordUpdate from "../components/passwordUpdate";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { styled, alpha } from "@mui/material/styles";
import { Box, Typography, Divider } from "@mui/material";
import {
  resetError,
  resetProfileError,
  resetPasswordError,
  resetProfileSuccess,
  resetPasswordSuccess,
} from "../../../store/actions/userActions";

const Wrapper = styled(Box)(({ theme: { breakpoints, spacing } }) => ({
  minWidth: 0,
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  [breakpoints.down("md")]: {
    paddingBottom: spacing(8),
  },
}));

const Header = styled(Box)(({ theme: { spacing, palette, zIndex } }) => ({
  top: 0,
  flexShrink: 0,
  position: "sticky",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  zIndex: zIndex.appBar,
  paddingLeft: spacing(3),
  paddingRight: spacing(3),
  paddingTop: spacing(2),
  paddingBottom: spacing(2),
  backdropFilter: "blur(6px)",
  backgroundColor: alpha(palette.background.default, 0.8),
}));

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      // to hide error and success alerts when the user navigate back to account
      // after the user has updated profile or password information

      dispatch(resetError());
      dispatch(resetPasswordError());
      dispatch(resetProfileError());
      dispatch(resetProfileSuccess());
      dispatch(resetPasswordSuccess());
    };
  }, [dispatch]);

  return (
    <Wrapper>
      <Header>
        <Typography sx={{ fontWeight: 600 }} variant="h6">
          {t("account.title")}
        </Typography>
      </Header>
      <ScrollBar
        sx={{
          pb: 2,
          flex: 1,
          display: "flex",
          overflowY: "auto",
          flexDirection: "column",
        }}
      >
        <ProfileUpdate />
        <Divider variant="middle" />
        <PasswordUpdate />
      </ScrollBar>
    </Wrapper>
  );
};

export default Profile;
