import React from "react";
import no_user from "../../../assets/images/no_user.png";
import AvatarPicker from "../../../shared/avatarPicker";

import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { SaveRounded } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  updateProfile,
  resetProfileError,
  resetProfileSuccess,
} from "../../../store/actions/userActions";

import {
  Box,
  Grid,
  Alert,
  TextField,
  AlertTitle,
  Typography,
  CircularProgress,
} from "@mui/material";

const ErrorImg = styled("img")({
  width: "16rem",
});

const ProfileUpdate = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [preview, setPreview] = useState("");
  const { user, loading, error, isTokenExpired, profileLoading, profileSuccess, profileError } =
    useSelector((state) => state.userState);

  const [profile, setProfile] = useState({ name: "", email: "", avatar: "", bio: "" });

  useEffect(() => {
    if (!isTokenExpired) {
      dispatch(getUser());
    }
  }, [dispatch, isTokenExpired]);

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

  const handleForm = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePreview = (preview) => {
    setPreview(preview);
  };

  const handleAvatar = (name, value) => {
    setProfile({ ...profile, [name]: value });
  };

  if (loading || error) {
    return (
      <Box
        sx={{
          pt: 5,
          pb: 5,
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
    <form onSubmit={handleUpdate}>
      <Box
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <AvatarPicker
          name="avatar"
          preview={preview}
          onChange={handleAvatar}
          handlePreview={handlePreview}
          image={profile.avatar && `https://budgety-api.herokuapp.com/avatars/${profile.avatar}`}
        />
        <Typography sx={{ fontWeight: 600, mt: 1 }} variant="body2">
          {t("account.avatar")}
        </Typography>
      </Box>
      <Box px={3} mt={4}>
        <Grid alignItems="center" container spacing={1}>
          <Grid item md={6}>
            <TextField
              disabled
              fullWidth
              margin="dense"
              variant="outlined"
              name="email"
              size="small"
              value={profile.email}
              onChange={handleForm}
              label={t("account.email")}
              placeholder="user@gmail.com"
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              name="name"
              size="small"
              margin="dense"
              autoComplete="off"
              variant="outlined"
              value={profile.name}
              onChange={handleForm}
              placeholder="@username"
              label={t("account.name")}
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <TextField
            rows={2}
            name="bio"
            fullWidth
            size="small"
            mergin="dense"
            variant="outlined"
            multiline={true}
            autoComplete="off"
            value={profile.bio}
            onChange={handleForm}
            label={t("account.bio")}
            placeholder={t("account.bio-placeholder")}
          />
        </Box>
        {profileError && (
          <Box sx={{ mt: 1.5 }}>
            <Alert onClose={() => dispatch(resetProfileError())} severity="error">
              <AlertTitle>Error</AlertTitle>
              {profileError}
            </Alert>
          </Box>
        )}
        {profileSuccess && (
          <Box sx={{ mt: 1.5 }}>
            <Alert onClose={() => dispatch(resetProfileSuccess())} severity="success">
              <AlertTitle>Success</AlertTitle>
              {profileSuccess}
            </Alert>
          </Box>
        )}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }} my={2}>
          <LoadingButton
            size="small"
            type="submit"
            color="primary"
            disableElevation
            variant="contained"
            onClick={handleUpdate}
            startIcon={<SaveRounded />}
            loadingPosition="start"
            disabled={profileLoading}
            loading={profileLoading}
          >
            {t("account.update-now")}
          </LoadingButton>
        </Box>
      </Box>
    </form>
  );
};

export default ProfileUpdate;
