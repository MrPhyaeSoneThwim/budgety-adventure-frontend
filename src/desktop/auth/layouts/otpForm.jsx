import {
  Box,
  Link,
  Alert,
  Dialog,
  Drawer,
  Button,
  AlertTitle,
  Typography,
  DialogContent,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { alpha, styled, useTheme } from "@mui/material/styles";
import {
  sendOtp,
  resendOtp,
  resetOtpError,
  resetOtpSuccess,
} from "../../../store/actions/userActions";

import React from "react";
import OtpInput from "react-otp-input";
import otp_code from "../../../assets/images/otp_code.png";
import { useNavigate } from "react-router-dom";

const OtpImg = styled("img")({
  width: "14rem",
});

const DialogTitle = styled(Box)(({ theme: { spacing } }) => ({
  paddingTop: spacing(2),
  paddingLeft: spacing(3),
  paddingRight: spacing(3),
  paddingBottom: spacing(1.5),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const LoadingWrapper = styled(Box)(({ theme: { palette } }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alpha(palette.mode === "light" ? palette.common.white : palette.grey[900], 0.75),
}));

const OtpForm = ({ open, handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { breakpoints, palette } = useTheme();
  const isSmDown = useMediaQuery(breakpoints.down("sm"));
  const { user, otpError, otpSuccess, otpLoading, isAuthenticated } = useSelector(
    (state) => state.userState
  );

  const [formData, setFormData] = useState({
    email: "",
    otpCode: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((formData) => ({ ...formData, email: user.email }));
    }
  }, [user]);

  useEffect(() => {
    let authTimeout;
    if (isAuthenticated && otpSuccess) {
      authTimeout = setTimeout(() => {
        handleClose();
        navigate("/");
      }, 2000);
    }
    return () => {
      clearTimeout(authTimeout);
    };
  }, [navigate, otpSuccess, isAuthenticated, handleClose]);

  const handleChange = (code) => {
    setFormData({ ...formData, otpCode: code });
  };

  const handleSend = () => {
    dispatch(sendOtp(formData));
  };

  const handleResend = () => {
    setFormData({ ...formData, otpCode: "" });
    dispatch(resendOtp(user._id));
  };

  const renderOTP = () => {
    return (
      <Box sx={{ position: "relative" }}>
        <DialogTitle>
          <OtpImg src={otp_code} alt="otp logo" />
          <Typography sx={{ fontWeight: 600 }} variant="h6">
            {t("auth.otp-title")}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <OtpInput
            numInputs={5}
            isInputNum={true}
            shouldAutoFocus={true}
            onChange={handleChange}
            value={formData.otpCode}
            separator={<span style={{ width: "8px" }}></span>}
            containerStyle={{ display: "flex", justifyContent: "space-around" }}
            inputStyle={{
              width: "54px",
              height: "54px",
              fontSize: "1rem",
              fontWeight: "500",
              borderRadius: "12px",
              color: palette.mode === "light" ? palette.grey[600] : palette.common.white,
              backgroundColor: palette.mode === "light" ? palette.grey[100] : palette.grey[900],
              border: `2px solid ${
                palette.mode === "light" ? palette.grey[100] : palette.grey[900]
              }`,
            }}
            focusStyle={{
              outline: "none",
              border: `2px solid ${palette.primary.main}`,
            }}
          />
          {otpError && (
            <Box sx={{ mt: 1.5 }}>
              <Alert onClose={() => dispatch(resetOtpError())} severity="error">
                <AlertTitle>Error</AlertTitle>
                {otpError}
              </Alert>
            </Box>
          )}
          {otpSuccess && (
            <Box sx={{ mt: 1.5 }}>
              <Alert onClose={() => dispatch(resetOtpSuccess())} severity="success">
                <AlertTitle>Success</AlertTitle>
                {otpSuccess}
              </Alert>
            </Box>
          )}
          {!otpSuccess && (
            <>
              <Box mt={3}>
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  disableElevation
                  variant="contained"
                  onClick={handleSend}
                  disabled={formData.otpCode.length !== 5}
                  sx={{ fontWeight: 600, py: 1.5 }}
                >
                  {t("auth.verify-otp")}
                </Button>
              </Box>
              <Box mt={2}>
                <Typography
                  variant="subtitle2"
                  sx={{ textAlign: "center", fontWeight: 500, mt: 2 }}
                >
                  {t("auth.resend-otp-title")}{" "}
                  <Link onClick={handleResend} sx={{ textDecoration: "none", cursor: "pointer" }}>
                    {t("auth.resend-otp")}
                  </Link>
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
        {otpLoading && (
          <LoadingWrapper>
            <CircularProgress color="primary" />
          </LoadingWrapper>
        )}
      </Box>
    );
  };

  if (isSmDown) {
    return (
      <Drawer anchor="bottom" open={open}>
        {renderOTP()}
      </Drawer>
    );
  }

  return (
    <Dialog maxWidth="sm" fullWidth open={open}>
      {renderOTP()}
    </Dialog>
  );
};

export default OtpForm;
