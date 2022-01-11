import React from "react";
import { useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import { Formik, Field, Form } from "formik";
import { SaveRounded } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { passwordSchema } from "../../../utils/validations";
import { Box, Grid, TextField, Typography, Alert, AlertTitle } from "@mui/material";
import {
  logout,
  updatePassword,
  resetPasswordError,
  resetPasswordSuccess,
} from "../../../store/actions/userActions";

const PasswordUpdate = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { passwordError, passwordSuccess, passwordLoading } = useSelector(
    (state) => state.userState
  );

  useEffect(() => {
    let logoutTimeout;
    if (passwordSuccess) {
      logoutTimeout = setTimeout(() => {
        dispatch(logout());
      }, 2000);
    }
    return () => {
      clearTimeout(logoutTimeout);
    };
  }, [dispatch, passwordSuccess]);

  return (
    <Box mt={2} px={3}>
      <Typography sx={{ fontWeight: 600 }} variant="subtitle1">
        {t("account.update-password")}
      </Typography>
      <Formik
        onSubmit={(values) => {
          dispatch(updatePassword(values));
        }}
        validationSchema={passwordSchema}
        initialValues={{ currentPassword: "", password: "", passwordConfirm: "" }}
      >
        {({ errors, touched, handleReset }) => {
          return (
            <Form>
              <Box mt={2}>
                <Grid container spacing={1}>
                  <Grid item md={6}>
                    <Field
                      fullWidth
                      size="small"
                      as={TextField}
                      margin="dense"
                      type="password"
                      name="currentPassword"
                      variant="outlined"
                      placeholder="********"
                      label={t("account.password")}
                      helperText={touched.currentPassword && errors.currentPassword}
                      error={Boolean(touched.currentPassword && errors.currentPassword)}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <Field
                      fullWidth
                      size="small"
                      margin="dense"
                      as={TextField}
                      type="password"
                      variant="outlined"
                      name="password"
                      placeholder="********"
                      label={t("account.new-password")}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box mt={1}>
                <Field
                  fullWidth
                  size="small"
                  margin="dense"
                  as={TextField}
                  type="password"
                  variant="outlined"
                  placeholder="********"
                  name="passwordConfirm"
                  label={t("account.confirm-password")}
                  helperText={touched.passwordConfirm && errors.passwordConfirm}
                  error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
                />
              </Box>

              {passwordError && (
                <Box sx={{ mt: 1.5 }}>
                  <Alert
                    onClose={() => {
                      handleReset();
                      dispatch(resetPasswordError());
                    }}
                    severity="error"
                  >
                    <AlertTitle>Error</AlertTitle>
                    {passwordError}
                  </Alert>
                </Box>
              )}
              {passwordSuccess && (
                <Box sx={{ mt: 1.5 }}>
                  <Alert onClose={() => dispatch(resetPasswordSuccess())} severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {passwordSuccess}
                  </Alert>
                </Box>
              )}
              <Box
                sx={{ my: 2, display: "flex", alignItems: "center", justifyContent: "flex-end" }}
              >
                <LoadingButton
                  size="small"
                  type="submit"
                  color="primary"
                  disableElevation
                  variant="contained"
                  startIcon={<SaveRounded />}
                  loadingPosition="start"
                  loading={passwordLoading}
                >
                  {t("account.update-now")}
                </LoadingButton>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
export default PasswordUpdate;
