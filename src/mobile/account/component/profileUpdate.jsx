import {
  Box,
  Alert,
  Drawer,
  Button,
  TextField,
  AlertTitle,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import {
  updateProfile,
  resetProfileError,
  resetProfileSuccess,
} from "../../../store/actions/userActions";

import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { SaveRounded } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";

import React from "react";
import AvatarPicker from "../../../shared/avatarPicker";

const ProfileUpdate = ({ open, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, profileLoading, profileError, profileSuccess } = useSelector(
    (state) => state.userState
  );

  const [preview, setPreview] = useState("");

  const [profile, setProfile] = useState({
    avatar: "",
    name: "",
    email: "",
    bio: "",
  });

  const handlePreview = (preview) => {
    setPreview(preview);
  };

  useEffect(() => {
    if (user) {
      setProfile({
        bio: user.bio ? user.bio : "",
        name: user.name ? user.name : "",
        email: user.email ? user.email : "",
        avatar: user.avatar ? user.avatar : "",
      });
    }
  }, [user]);

  const handleUpdate = () => {
    const formData = new FormData();

    // append data as form data for profile image
    formData.append("email", profile.email);
    if (profile.avatar) {
      formData.append("avatar", profile.avatar);
    }
    formData.append("name", profile.name);
    formData.append("bio", profile.bio);

    dispatch(updateProfile(formData));
  };

  const handleClose = useCallback(() => {
    if (profileError) {
      dispatch(resetProfileError());
    }
    if (profileSuccess) {
      dispatch(resetProfileSuccess());
    }
    setPreview("");
    setProfile({
      bio: user.bio ? user.bio : "",
      name: user.name ? user.name : "",
      email: user.email ? user.email : "",
      avatar: user.avatar ? user.avatar : "",
    });
    onClose();
  }, [
    onClose,
    dispatch,
    user.bio,
    user.email,
    user.name,
    user.avatar,
    profileError,
    profileSuccess,
  ]);

  useEffect(() => {
    let successTimeout;
    if (profileSuccess) {
      successTimeout = setTimeout(() => {
        handleClose();
      }, 2000);
    }
    return () => {
      clearTimeout(successTimeout);
    };
  }, [profileSuccess, handleClose]);

  const handleForm = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAvatar = (name, value) => {
    setProfile({ ...profile, [name]: value });
  };

  return (
    <Drawer
      open={open}
      anchor="bottom"
      onClose={!profileLoading || profileSuccess ? handleClose : () => {}}
    >
      <DialogTitle>{t("account.update-profile")}</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AvatarPicker
          name="avatar"
          preview={preview}
          onChange={handleAvatar}
          handlePreview={handlePreview}
          image={profile.avatar && `https://budgety-api.herokuapp.com/avatars/${profile.avatar}`}
        />
        <Typography sx={{ fontWeight: 600, mt: 1 }} variant="subtitle2">
          {t("account.avatar")}
        </Typography>
        <Box sx={{ mt: 2, width: "100%" }}>
          <TextField
            fullWidth
            name="name"
            margin="dense"
            autoComplete="off"
            variant="outlined"
            value={profile.name}
            onChange={handleForm}
            placeholder="@username"
            label={t("account.name")}
          />
        </Box>
        <Box sx={{ mt: 2, width: "100%" }}>
          <TextField
            fullWidth
            name="bio"
            rows={2}
            mergin="dense"
            multiline={true}
            variant="outlined"
            autoComplete="off"
            value={profile.bio}
            onChange={handleForm}
            label={t("account.bio")}
            placeholder={t("account.bio-placeholder")}
          />
        </Box>
        {profileError && (
          <Box sx={{ mt: 1.5, width: "100%" }}>
            <Alert onClose={() => dispatch(resetProfileError())} severity="error">
              <AlertTitle>Error</AlertTitle>
              {profileError}
            </Alert>
          </Box>
        )}
        {profileSuccess && (
          <Box sx={{ mt: 1.5, width: "100%" }}>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              {profileSuccess}
            </Alert>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3 }}>
        {!profileLoading && !profileSuccess && (
          <Button onClick={handleClose}>{t("actions.dismiss")}</Button>
        )}
        <LoadingButton
          size="small"
          type="submit"
          color="primary"
          disableElevation
          onClick={handleUpdate}
          startIcon={<SaveRounded />}
          loadingPosition="start"
          loading={profileLoading}
          disabled={!!profileLoading}
        >
          {t("account.update-now")}
        </LoadingButton>
      </DialogActions>
    </Drawer>
  );
};

export default ProfileUpdate;
