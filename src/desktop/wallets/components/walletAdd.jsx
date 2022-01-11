import React from "react";
import {
  Box,
  Grid,
  Alert,
  Dialog,
  AlertTitle,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { TextField, Button } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme, styled, alpha } from "@mui/material/styles";
import { COLOR_OPTIONS, walletIcons } from "../../../utils/constants";
import { resetError, addWallet, resetSuccess } from "../../../store/actions/walletActions";

import ScrollBar from "../../../shared/scrollBar";
import SelectIcon from "../../../shared/selectIcon";
import ColorPicker from "../../../shared/colorPicker";
import NumberFormatCustom from "../../../shared/numberFormat";

const LoadingWrapper = styled(Box)(({ theme: { palette, zIndex } }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: zIndex.drawer + 1,
  backgroundColor: alpha(palette.mode === "light" ? palette.common.white : palette.grey[900], 0.75),
}));

const WalletAdd = ({ open, onClose }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [balanceError, setBalanceError] = useState("");

  const { user } = useSelector((state) => state.userState);
  const { success, error, loading } = useSelector((state) => state.walletState);

  const initialState = useMemo(
    () => ({
      name: "",
      balance: "",
      user: null,
      icon: walletIcons[0].name,
      iconColor: COLOR_OPTIONS[0],
    }),
    []
  );

  const [wallet, setWallet] = useState({ ...initialState });

  useEffect(() => {
    if (user) {
      setWallet((wallet) => ({ ...wallet, user: user._id }));
    }
  }, [user]);

  useEffect(() => {
    if (success) {
      setWallet({ ...initialState });
    }
  }, [success, initialState]);

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
    setWallet({ ...wallet, [name]: value });
  };

  const handleWalletAdd = () => {
    dispatch(addWallet(wallet));
  };

  const handleClose = () => {
    setWallet({ ...initialState });
    dispatch(resetError());
    dispatch(resetSuccess());
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={loading ? () => {} : handleClose}>
      <Box sx={{ position: "relative" }}>
        <DialogTitle>{t("wallets.wallet-add.title")}</DialogTitle>
        <DialogContent>
          <Box mt={1}>
            <TextField
              fullWidth
              name="name"
              variant="outlined"
              autoComplete="off"
              value={wallet.name}
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
              value={wallet.balance}
              onChange={handleForm}
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
              label={t("wallets.amount")}
              error={Boolean(balanceError)}
              helperText={Boolean(balanceError) && balanceError}
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
                selected={wallet.iconColor}
                sx={{ flexDirection: "row", mx: -0.5 }}
              />
            </Box>
          </Box>
          <Box mt={1}>
            <Typography sx={{ fontWeight: 600 }} variant="subtitle2">
              {t("wallets.select-icon")}
            </Typography>
            <Box mt={1} mx={-1}>
              <ScrollBar sx={{ maxHeight: theme.spacing(15.5), overflowY: "auto" }}>
                <Grid container>
                  {walletIcons.map((walletIcon) => {
                    return (
                      <Grid key={walletIcon._id} item xs={2}>
                        <SelectIcon
                          name="icon"
                          iconType="wallet"
                          key={walletIcon.name}
                          value={walletIcon.name}
                          selected={wallet.icon}
                          iconBackground={wallet.iconColor}
                          onChange={(name, value) => {
                            setWallet({ ...wallet, [name]: value });
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
            onClick={handleWalletAdd}
            disabled={!!balanceError || !wallet.name || !wallet.balance}
            color="primary"
          >
            {t("actions.submit")}
          </Button>
        </DialogActions>
        {loading && (
          <LoadingWrapper>
            <CircularProgress color="primary" />
          </LoadingWrapper>
        )}
      </Box>
    </Dialog>
  );
};

export default WalletAdd;
