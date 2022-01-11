import {
  Box,
  Grid,
  Alert,
  Dialog,
  Button,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  ButtonBase,
  CircularProgress,
} from "@mui/material";

import { MobileDatePicker } from "@mui/lab";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { walletIcons } from "../../../utils/constants";
import { KeyboardArrowDownRounded } from "@mui/icons-material";
import { styled, useTheme, alpha } from "@mui/material/styles";
import { getWallets } from "../../../store/actions/walletActions";
import { getCategories } from "../../../store/actions/categoryActions";
import {
  resetError,
  resetSuccess,
  getTransaction,
  updateTransaction,
} from "../../../store/actions/transActions";

import _ from "lodash";
import SelectWallet from "./selectWallet";
import ScrollBar from "../../../shared/scrollBar";
import TabButton from "../../../shared/tabButton";
import SelectIcon from "../../../shared/selectIcon";
import NumberFormatCustom from "../../../shared/numberFormat";
import no_content from "../../../assets/images/no_content.png";

const ErrorImg = styled("img")({
  width: "16rem",
});

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

const TransactionEdit = ({ editId, onClose }) => {
  const { t } = useTranslation();
  const { palette, spacing } = useTheme();
  const dispatch = useDispatch();

  const { wallets, walletsError, walletsLoading } = useSelector((state) => state.walletState);
  const { categories, getAllError, getAllLoading } = useSelector((state) => state.categoryState);

  const { transaction, getTranError, getTranLoading, error, success, loading } = useSelector(
    (state) => state.transState
  );

  const [amountError, setAmountError] = useState("");
  const [selectWalletOpen, setSelectWalletOpen] = useState(false);

  const [formData, setFormData] = useState({
    status: "income",
    amount: "",
    wallet: null,
    category: null,
    createdAt: new Date(),
  });

  useEffect(() => {
    if (editId) {
      dispatch(getTransaction(editId));
    }
  }, [editId, dispatch]);

  useEffect(() => {
    if (transaction) {
      setFormData((formData) => ({
        ...formData,
        status: transaction.status,
        amount: transaction.amount,
        wallet: transaction.wallet._id,
        category: transaction.category._id,
        createdAt: new Date(transaction.createdAt),
      }));
    }
  }, [transaction]);

  useEffect(() => {
    if (formData.status && transaction) {
      setFormData((formData) => ({ ...formData, category: transaction.category._id }));
    }
  }, [formData.status, transaction]);

  useEffect(() => {
    dispatch(getCategories({ type: formData.status }));
  }, [formData.status, dispatch]);

  useEffect(() => {
    dispatch(getWallets());
  }, [dispatch]);

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

  const handleUpdateTransaction = () => {
    dispatch(updateTransaction(transaction._id, formData));
  };

  const handleClose = () => {
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
    <Dialog fullWidth open={!!editId} maxWidth="sm" onClose={loading ? () => {} : handleClose}>
      <Box sx={{ position: "relative" }}>
        <DialogTitle>{t("dashboard.transaction-edit.title")}</DialogTitle>
        {(getTranLoading && (
          <Box sx={{ py: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress color="primary" />
          </Box>
        )) ||
          (getTranError && (
            <Box
              sx={{
                py: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ErrorImg src={no_content} alt="empty content" />
              <Typography sx={{ fontSize: "1.05rem", fontWeight: 500, mt: -2 }}>
                {getTranError}
              </Typography>
            </Box>
          )) ||
          (transaction && (
            <>
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
                  <Grid item md={6}>
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
                  <Grid item md={6}>
                    <MobileDatePicker
                      views={["day"]}
                      showToolbar={false}
                      onChange={handleDate}
                      label={t("dashboard.date")}
                      value={formData.createdAt}
                      renderInput={(params) => <TextField {...params} variant="outlined" />}
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
                        sx={{
                          py: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
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
                    <Box
                      sx={{
                        py: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
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
                                  <Grid key={index} item md={3}>
                                    <SelectIcon
                                      key={index}
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
                  onClick={handleUpdateTransaction}
                  disabled={!formData.amount || !!amountError}
                >
                  {t("actions.submit")}
                </Button>
              </DialogActions>
              {loading && (
                <LoadingWrapper>
                  <CircularProgress color="primary" />
                </LoadingWrapper>
              )}
            </>
          ))}
      </Box>
    </Dialog>
  );
};

export default TransactionEdit;
