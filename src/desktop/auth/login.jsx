import {
  Box,
  Link,
  Alert,
  Button,
  Backdrop,
  AlertTitle,
  Typography,
  LinearProgress,
  Container as MuiContainer,
} from "@mui/material";

import { Formik, Field, Form } from "formik";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { loginSchema } from "../../utils/validations";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  login,
  resetError,
  resetSuccess,
  resetOtpSuccess,
  resetOtpError,
} from "../../store/actions/userActions";

import React from "react";
import OtpForm from "./layouts/otpForm";
import Helmet from "../../common/helmet";
import TextField from "./components/textField";
import logo from "../../assets/images/wallet.svg";

const Wrapper = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Container = styled(MuiContainer)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const Logo = styled("img")(({ theme: { spacing } }) => ({
  width: spacing(5),
}));

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otpOpen, setOtpOpen] = useState(false);
  const { loading, error, isAuthenticated, success, otpSuccess } = useSelector(
    (state) => state.userState
  );

  useEffect(() => {
    return () => {
      dispatch(resetError());
      dispatch(resetSuccess());
      dispatch(resetOtpSuccess());
      dispatch(resetOtpError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && !otpSuccess) {
      navigate("/");
    }
  }, [navigate, otpSuccess, isAuthenticated]);

  useEffect(() => {
    let otpTimeout;
    if (!isAuthenticated && success) {
      otpTimeout = setTimeout(() => {
        setOtpOpen(true);
      }, 2000);
    }
    return () => {
      clearTimeout(otpTimeout);
    };
  }, [success, isAuthenticated]);

  const handleOtpClose = useCallback(() => {
    setOtpOpen(false);
  }, []);

  return (
    <>
      <Helmet title="Login" />

      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        {loading && (
          <LinearProgress
            color="primary"
            variant="indeterminate"
            sx={{ position: "fixed", top: 0, width: "100%", height: "2px" }}
          />
        )}
      </Backdrop>
      <Wrapper>
        <OtpForm open={otpOpen} handleClose={handleOtpClose} />
        <Container maxWidth="xs">
          <Box
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Logo src={logo} alt="logo" />
            <Typography variant="h6" sx={{ fontWeight: 600, color: "primary.main", mt: 1 }}>
              Budgety
            </Typography>
            <Typography variant="subtitle2" sx={{ fontSize: "1rem", fontWeight: 600, mt: 0.5 }}>
              {t("auth.login-title")}
            </Typography>
          </Box>
          <Box mt={4}>
            <Formik
              validationSchema={loginSchema}
              initialValues={{ email: "", password: "" }}
              onSubmit={(values) => {
                dispatch(login(values));
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    id="email"
                    name="email"
                    variant="filled"
                    as={TextField}
                    autoComplete="off"
                    label={t("auth.email")}
                    placeholder="user@gmail.com"
                    error={Boolean(errors.email && touched.email)}
                    helperText={touched.email && errors.email && t(`auth.email-${errors.email}`)}
                  />
                  <Box mt={3}>
                    <Field
                      fullWidth
                      id="password"
                      as={TextField}
                      name="password"
                      type="password"
                      variant="filled"
                      autoComplete="off"
                      label={t("auth.password")}
                      placeholder="6+ characters password"
                      error={Boolean(errors.password && touched.password)}
                      helperText={
                        touched.password && errors.password && t(`auth.password-${errors.password}`)
                      }
                    />
                  </Box>

                  {error && (
                    <Box sx={{ mt: 1.5 }}>
                      <Alert onClose={() => dispatch(resetError())} severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {error}
                      </Alert>
                    </Box>
                  )}
                  {success && (
                    <Box sx={{ mt: 1.5 }}>
                      <Alert onClose={() => dispatch(resetSuccess())} severity="success">
                        <AlertTitle>Success</AlertTitle>
                        {success}
                      </Alert>
                    </Box>
                  )}

                  <Box mt={2}>
                    <Button
                      fullWidth
                      type="submit"
                      color="primary"
                      disableElevation
                      variant="contained"
                      sx={{ fontWeight: 600, py: 1.5 }}
                    >
                      {t("auth.login")}
                    </Button>
                  </Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ textAlign: "center", fontWeight: 500, mt: 2 }}
                  >
                    {t("auth.login-footer-title")}{" "}
                    <Link sx={{ textDecoration: "none" }} to="/signup" component={RouterLink}>
                      {t("auth.signup")}
                    </Link>
                  </Typography>
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
      </Wrapper>
    </>
  );
};

export default Login;
