import React from "react";
import ScrollBar from "../../../shared/scrollBar";
import SelectIcon from "../../../shared/selectIcon";
import ColorPicker from "../../../shared/colorPicker";
import NumberFormatCustom from "../../../shared/numberFormat";
import no_content from "../../../assets/images/no_content.png";

import {
  Box,
  Grid,
  Drawer,
  Alert,
  AlertTitle,
  DialogTitle,
  Typography,
  DialogActions,
  DialogContent,
  CircularProgress,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useTheme, styled, alpha } from "@mui/material/styles";
import { COLOR_OPTIONS, walletIcons } from "../../../utils/constants";
import {
  getWallet,
  resetError,
  updateWallet,
  resetSuccess,
} from "../../../store/actions/walletActions";

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

const ErrorImg = styled("img")({
  width: "16rem",
});

const WalletEdit = ({ editId, onClose }) => {
  const { spacing } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [balanceError, setBalanceError] = useState("");
  const [walletData, setWalletData] = useState({
    name: "",
    balance: "",
    icon: "",
    iconColor: COLOR_OPTIONS[0],
  });

  const { wallet, getLoading, getError, error, success, loading } = useSelector(
    (state) => state.walletState
  );

  useEffect(() => {
    return () => {
      dispatch(resetError());
      dispatch(resetSuccess());
    };
  }, [dispatch]);

  useEffect(() => {
    if (editId) {
      dispatch(getWallet(editId));
    }
  }, [editId, dispatch]);

  useEffect(() => {
    if (wallet) {
      setWalletData({
        name: wallet.name,
        balance: wallet.balance,
        icon: wallet.icon,
        iconColor: wallet.iconColor,
      });
    }
  }, [wallet]);

  const handleUpdate = () => {
    dispatch(updateWallet(wallet._id, walletData));
  };

  const handleForm = (event) => {
    const { name, value } = event.target;
    if (name === "balance") {
      let regex = /^0[0-9].*$/;
      if (regex.test(value.toString()) || value.toString().startsWith("-")) {
        setBalanceError("Balance amount is not valid.");
      } else {
        setBalanceError("");
      }
    }
    setWalletData({ ...walletData, [name]: value });
  };

  const handleClose = () => {
    dispatch(resetError());
    dispatch(resetSuccess());
    onClose();
  };

  return (
    <Drawer anchor="bottom" open={!!editId} onClose={loading ? () => {} : handleClose}>
      <Box sx={{ position: "relative" }}>
        <DialogTitle>{t("wallets.wallet-edit.title")}</DialogTitle>
        {(getLoading && (
          <Box sx={{ py: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress color="primary" />
          </Box>
        )) ||
          (getError && (
            <Box
              sx={{
                py: 5,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <ErrorImg src={no_content} alt="empty content" />
              <Typography sx={{ fontSize: "1.05rem", fontWeight: 500, mt: -2 }}>
                {getError}
              </Typography>
            </Box>
          )) ||
          (wallet && (
            <>
              <DialogContent>
                <Box mt={1}>
                  <TextField
                    fullWidth
                    name="name"
                    variant="outlined"
                    autoComplete="off"
                    value={walletData.name}
                    onChange={handleForm}
                    label={t("wallets.name")}
                  />
                </Box>
                <Box mt={2}>
                  <TextField
                    fullWidth
                    name="balance"
                    autoComplete="off"
                    variant="outlined"
                    placeholder="1,00"
                    onChange={handleForm}
                    value={walletData.balance}
                    error={Boolean(balanceError)}
                    helperText={Boolean(balanceError) && balanceError}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    label={t("wallets.amount")}
                  />
                </Box>
                <Box mt={1}>
                  <Typography sx={{ fontWeight: 600 }} variant="subtitle2">
                    {t("wallets.select-color")}
                  </Typography>
                  <Box mt={1}>
                    <ColorPicker
                      name="iconColor"
                      colors={COLOR_OPTIONS}
                      onChange={handleForm}
                      selected={walletData.iconColor}
                      sx={{ flexDirection: "row" }}
                    />
                  </Box>
                </Box>
                <Box mt={1}>
                  <Typography sx={{ fontWeight: 600 }} variant="subtitle2">
                    {t("wallets.select-icon")}
                  </Typography>
                  <Box mt={1} mx={-1}>
                    <ScrollBar sx={{ maxHeight: spacing(15.5), overflowY: "auto" }}>
                      <Grid container>
                        {walletIcons.map((walletIcon) => {
                          return (
                            <Grid key={walletIcon._id} item sm={1} xs={2}>
                              <SelectIcon
                                name="icon"
                                iconType="wallet"
                                value={walletIcon.name}
                                selected={walletData.icon}
                                iconBackground={walletData.iconColor}
                                onChange={(name, value) => {
                                  setWalletData({ ...walletData, [name]: value });
                                }}
                                icon={walletIcon.name}
                              />
                            </Grid>
                          );
                        })}
                      </Grid>
                    </ScrollBar>
                  </Box>
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
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>{t("actions.dismiss")}</Button>
                <Button
                  color="primary"
                  onClick={handleUpdate}
                  disabled={
                    !!balanceError ||
                    !walletData.name ||
                    !walletData.balance ||
                    walletData.balance === "0"
                  }
                >
                  {t("actions.submit")}
                </Button>
              </DialogActions>
            </>
          ))}
        {loading && (
          <LoadingWrapper>
            <CircularProgress color="primary" />
          </LoadingWrapper>
        )}
      </Box>
    </Drawer>
  );
};

export default WalletEdit;
