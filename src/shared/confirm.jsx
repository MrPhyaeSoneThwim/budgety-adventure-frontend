import React from "react";
import {
  Box,
  Alert,
  Dialog,
  Button,
  AlertTitle,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { styled, alpha } from "@mui/material/styles";

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

const Confirm = ({
  open,
  error,
  title,
  loading,
  onClose,
  onSubmit,
  hideDismiss,
  description,
  onClearError,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog maxWidth="xs" open={open ? open : false} onClose={onClose}>
      <Box sx={{ position: "relative" }}>
        {loading && (
          <LoadingWrapper>
            <CircularProgress color="primary" />
          </LoadingWrapper>
        )}
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography>{description}</Typography>
          {error && (
            <Box sx={{ mt: 1.5 }}>
              <Alert onClose={onClearError} severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          {!hideDismiss && <Button onClick={onClose}>{t("actions.dismiss")}</Button>}
          <Button onClick={onSubmit} type="success">
            {t("actions.submit")}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

Confirm.defaultProps = {
  hideDismiss: false,
};

export default Confirm;
