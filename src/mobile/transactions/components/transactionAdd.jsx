import {
  Box,
  Grid,
  Drawer,
  Button,
  Alert,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  ButtonBase,
  CircularProgress,
} from "@mui/material";

import { useEffect, useState } from "react";
import { MobileDatePicker } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { walletIcons } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { styled, useTheme, alpha } from "@mui/material/styles";
import { KeyboardArrowDownRounded } from "@mui/icons-material";
import { resetSuccess, addTransaction, resetError } from "../../../store/actions/transActions";
import { getCategories } from "../../../store/actions/categoryActions";
import { getWallets } from "../../../store/actions/walletActions";

import _ from "lodash";
import React from "react";
import SelectWallet from "./selectWallet";
import ScrollBar from "../../../shared/scrollBar";
import TabButton from "../../../shared/tabButton";
import SelectIcon from "../../../shared/selectIcon";
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

const PickerButton = styled(ButtonBase)(({ theme: { palette, spacing } }) => ({
  cursor: "pointer",
  display: "flex",
  borderRadius: spacing(1.5),
  padding: `6px 10px`,
  alignItems: "center",
  width: "100%",
  justifyContent: "space-between",
  backgroundColor: palette.mode === "light" ? palette.grey[100] : palette.grey[800],
  border: `1px solid ${palette.mode === "light" ? palette.grey[100] : palette.grey[800]}`,
  "&:hover": {
    backgroundColor: palette.mode === "light" ? palette.grey[100] : palette.grey[800],
  },
}));

const PickerIcon = styled(Box)(({ theme: { spacing, palette } }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: spacing(6),
  padding: spacing(1.25),
  marginRight: spacing(1.5),
  color: palette.common.white,
}));

const TransactionAdd = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { palette, spacing } = useTheme();

  const dispatch = useDispatch();

  const { loading, success, error } = useSelector((state) => state.transState);
  const { wallets, walletsError, walletsLoading } = useSelector((state) => state.walletState);
  const { categories, getAllError, getAllLoading } = useSelector((state) => state.categoryState);

  const [amountError, setAmountError] = useState("");

  const initialState = {
    status: "income",
    amount: "100",
    wallet: null,
    category: null,
    createdAt: new Date(),
  };

  const [formData, setFormData] = useState({ ...initialState });

  const [selectWalletOpen, setSelectWalletOpen] = useState(false);

  useEffect(() => {
    dispatch(getCategories({ type: formData.status }));
  }, [formData.status, dispatch]);

  useEffect(() => {
    dispatch(getWallets());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length) {
      setFormData((formData) => ({ ...formData, category: categories[0]._id }));
    } else {
      setFormData((formData) => ({
        ...formData,
        category: null,
      }));
    }
  }, [categories]);

  useEffect(() => {
    if (wallets.length) {
      setFormData((formData) => ({ ...formData, wallet: wallets[0]._id }));
    } else {
      setFormData((formData) => ({
        ...formData,
        wallet: null,
      }));
    }
  }, [wallets]);

  const handleAmount = (event) => {
    const { name, value } = event.target;
    let regex = /^[1-9]+[0-9]*$/;
    if (!regex.test(value.toString())) {
      setAmountError("Amount is not valid.");
    } else {
      setAmountError("");
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleTabChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDate = (date) => {
    setFormData({ ...formData, createdAt: date });
  };

  const openSelectWallet = () => {
    setSelectWalletOpen(true);
  };

  const closeSelectWallet = () => {
    setSelectWalletOpen(false);
  };

  const handleSelectWallet = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setSelectWalletOpen(false);
  };

  const handleAddTransaction = () => {
    dispatch(addTransaction(formData));
  };

  const handleClose = () => {
    setFormData({ ...initialState, wallet: wallets[0]._id, category: categories[0]._id });
    dispatch(resetError());
    dispatch(resetSuccess());
    onClose();
  };

  const renderWallet = (walletId) => {
    const wallet = _.find(wallets, (wallet) => wallet._id === walletId);
    if (wallet) {
      const Icon = _.find(walletIcons, (walletIcon) => walletIcon.name === wallet.icon).icon;
      return (
        <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          <PickerIcon sx={{ backgroundColor: wallet.iconColor }}>
            <Icon size={20} color={palette.common.white} />
          </PickerIcon>
          <Typography color="textPrimary" variant="subtitle2" sx={{ fontWeight: 600 }}>
            {wallet.name}
          </Typography>
        </Box>
      );
    }

    return null;
  };

  return (
    <Drawer anchor="bottom" open={open} onClose={loading ? () => {} : handleClose}>
      <Box sx={{ position: "relative" }}>
        <DialogTitle>{t("dashboard.transaction-add.title")}</DialogTitle>
        <DialogContent sx={{ pb: 0 }}>
          <Box sx={{ display: "inline-flex", alignItems: "center" }}>
            <TabButton
              name="status"
              value="income"
              label={t("dashboard.income")}
              onChange={handleTabChange}
              activeValue={formData.status}
            />
            <TabButton
              name="status"
              value="expense"
              label={t("dashboard.expense")}
              onChange={handleTabChange}
              activeValue={formData.status}
            />
          </Box>
          <Grid sx={{ mt: 1.25 }} spacing={1} container>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="amount"
                autoComplete="off"
                variant="outlined"
                placeholder="1,00"
                value={formData.amount}
                onChange={handleAmount}
                label={t("dashboard.amount")}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                error={Boolean(amountError)}
                helperText={amountError && amountError}
              />
            </Grid>
            <Grid item xs={6}>
              <MobileDatePicker
                views={["day"]}
                showToolbar={false}
                onChange={handleDate}
                label={t("dashboard.date")}
                value={formData.createdAt}
                renderInput={(params) => <TextField fullWidth {...params} variant="outlined" />}
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Typography sx={{ fontWeight: 600 }} variant="subtitle2">
              {t("dashboard.select-wallet")}
            </Typography>
            <Box mt={1}>
              {(walletsLoading && (
                <Box
                  sx={{ py: 2, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <CircularProgress />
                </Box>
              )) ||
                (walletsError && <Alert severity="error">{walletsError}</Alert>) ||
                (wallets.length > 0 && (
                  <PickerButton onClick={openSelectWallet}>
                    {renderWallet(formData.wallet)}
                    <Box sx={{ mt: 1 }}>
                      <KeyboardArrowDownRounded />
                    </Box>
                  </PickerButton>
                ))}
              <SelectWallet
                name="wallet"
                wallets={wallets}
                open={selectWalletOpen}
                onClose={closeSelectWallet}
                selected={formData.wallet}
                onChange={handleSelectWallet}
              />
            </Box>
          </Box>
          <Box mt={1}>
            {(getAllLoading && (
              <Box sx={{ py: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            )) ||
              (getAllError && (
                <Box py={1}>
                  <Alert severity="error">{getAllError}</Alert>
                </Box>
              )) ||
              (categories.length > 0 && (
                <Box mt={2}>
                  <Typography sx={{ fontWeight: 600 }} variant="subtitle2">
                    {t("dashboard.select-category")}
                  </Typography>
                  <Box mt={1} mx={-2}>
                    <ScrollBar sx={{ maxHeight: spacing(15.5), overflowY: "auto" }}>
                      <Grid container>
                        {categories.map((category, index) => {
                          return (
                            <Grid key={category._id} item xs={2.4} sm={1.5}>
                              <SelectIcon
                                name="category"
                                iconType="category"
                                value={category._id}
                                label={category.name}
                                selected={formData.category}
                                iconBackground={category.iconColor}
                                onChange={(name, value) => {
                                  setFormData({ ...formData, [name]: value });
                                }}
                                icon={category.icon}
                              />
                            </Grid>
                          );
                        })}
                      </Grid>
                    </ScrollBar>
                  </Box>
                </Box>
              ))}
          </Box>
          {error && (
            <Box sx={{ mt: 1.5 }}>
              <Alert onClose={() => dispatch(resetError())} severity="error">
                {error}
              </Alert>
            </Box>
          )}
          {success && (
            <Box sx={{ mt: 1.5 }}>
              <Alert onClose={() => dispatch(resetSuccess())} severity="success">
                {success}
              </Alert>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleClose}>{t("actions.dismiss")}</Button>
          <Button
            color="primary"
            onClick={handleAddTransaction}
            disabled={!formData.amount || !!amountError || !formData.wallet || !formData.category}
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
    </Drawer>
  );
};

export default TransactionAdd;
