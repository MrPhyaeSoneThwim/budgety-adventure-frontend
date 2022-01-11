import React from "react";
import {
  Box,
  Alert,
  Drawer,
  Button,
  TextField,
  AlertTitle,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Field, Form } from "formik";
import { useTranslation } from "react-i18next";
import { SaveRounded } from "@mui/icons-material";
import { useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { passwordSchema } from "../../../utils/validations";
import {
  updatePassword,
  resetPasswordError,
  resetPasswordSuccess,
} from "../../../store/actions/userActions";

const PasswordUpdate = ({ open, onClose, handleOpen }) => {
  const formikRef = useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { passwordError, passwordSuccess, passwordLoading } = useSelector(
    (state) => state.userState
  );

  const handleClose = useCallback(() => {
    if (passwordError) {
      dispatch(resetPasswordError());
    }
    if (passwordSuccess) {
      dispatch(resetPasswordSuccess());
    }
    onClose();
  }, [onClose, passwordError, passwordSuccess, dispatch]);

  useEffect(() => {
    if (passwordError) {
      formikRef.current.resetForm();
    }
  }, [passwordError]);

  useEffect(() => {
    let successTimeout;
    if (passwordSuccess) {
      successTimeout = setTimeout(() => {
        handleClose();
      }, 2000);
    }
    return () => {
      clearTimeout(successTimeout);
    };
  }, [passwordSuccess, handleClose]);

  return (
    <Drawer
      open={open}
      anchor="bottom"
      onClose={!passwordLoading || passwordSuccess ? handleClose : () => {}}
    >
      <DialogTitle>{t("account.update-password")}</DialogTitle>
      <Formik
        innerRef={formikRef}
        onSubmit={(values) => {
          dispatch(updatePassword(values));
        }}
        validationSchema={passwordSchema}
        initialValues={{ currentPassword: "", password: "", passwordConfirm: "" }}
      >
        {({ errors, values, touched, handleReset }) => (
          <Form>
            <DialogContent
              sx={{
                pt: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Field
                  fullWidth
                  as={TextField}
                  margin="dense"
                  type="password"
                  variant="outlined"
                  placeholder="********"
                  name="currentPassword"
                  label={t("account.password")}
                  value={values.currentPassword}
                  helperText={touched.currentPassword && errors.currentPassword}
                  error={Boolean(touched.currentPassword && errors.currentPassword)}
                />
              </Box>
              <Box sx={{ mt: 1, width: "100%" }}>
                <Field
                  fullWidth
                  margin="dense"
                  as={TextField}
                  type="password"
                  variant="outlined"
                  name="password"
                  placeholder="********"
                  value={values.password}
                  label={t("account.new-password")}
                  helperText={touched.password && errors.password}
                  error={Boolean(touched.password && errors.password)}
                />
              </Box>
              <Box sx={{ mt: 1, width: "100%" }}>
                <Field
                  fullWidth
                  margin="dense"
                  as={TextField}
                  type="password"
                  variant="outlined"
                  placeholder="********"
                  name="passwordConfirm"
                  value={values.passwordConfirm}
                  label={t("account.confirm-password")}
                  helperText={touched.passwordConfirm && errors.passwordConfirm}
                  error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
                />
              </Box>
              {passwordError && (
                <Box sx={{ mt: 1.5, width: "100%" }}>
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
                <Box sx={{ mt: 1.5, width: "100%" }}>
                  <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {passwordSuccess}
                  </Alert>
                </Box>
              )}
            </DialogContent>
            <DialogActions sx={{ px: 3 }}>
              {!passwordLoading && !passwordSuccess && (
                <Button onClick={onClose}>{t("actions.dismiss")}</Button>
              )}

              <LoadingButton
                size="small"
                type="submit"
                color="primary"
                disableElevation
                startIcon={<SaveRounded />}
                loadingPosition="start"
                loading={passwordLoading}
              >
                {t("account.update-now")}
              </LoadingButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};

export default PasswordUpdate;
