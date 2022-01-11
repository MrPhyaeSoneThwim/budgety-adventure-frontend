import React from "react";
import {
  Box,
  Dialog,
  Button,
  Divider,
  Typography,
  DialogActions,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import _ from "lodash";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { walletIcons } from "../../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { getWallet, resetGetError } from "../../../store/actions/walletActions";
import no_content from "../../../assets/images/no_content.png";

const ErrorImg = styled("img")({
  width: "16rem",
});

const WalletDetail = ({ detailId, onClose }) => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { wallet, getLoading, getError } = useSelector((state) => state.walletState);

  useEffect(() => {
    if (detailId) {
      dispatch(getWallet(detailId));
    }
  }, [detailId, dispatch]);

  const handleClose = () => {
    dispatch(resetGetError());
    onClose();
  };

  const renderIcon = (icon) => {
    const Icon = _.find(walletIcons, (walletIcon) => walletIcon.name === icon).icon;
    return <Icon size={24} color={palette.common.white} />;
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={!!detailId} onClose={handleClose}>
      <DialogContent>
        {(getLoading && (
          <Box sx={{ py: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress color="primary" />
          </Box>
        )) ||
          (getError && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={(theme) => ({
                    p: 1,
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: wallet.iconColor,
                    color: theme.palette.common.white,
                  })}
                >
                  {renderIcon(wallet.icon)}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    mt: 1,
                    fontWeight: 600,
                  }}
                >
                  {wallet.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: 1,
                  py: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="subtitle1">{t("wallets.initial-balance")}</Typography>
                <Typography>{`${
                  wallet.balance ? wallet.balance.toLocaleString() : "0.00"
                }`}</Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  py: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle1">{t("wallets.remain")}</Typography>
                <Typography>{`${
                  wallet.remain ? wallet.remain.toLocaleString() : "0.00"
                }`}</Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  py: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle1">{t("wallets.income")}</Typography>
                <Typography>{`${
                  wallet.income ? wallet.income.toLocaleString() : "0.00"
                }`}</Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  py: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle1">{t("wallets.expense")}</Typography>
                <Typography>{`${
                  wallet.expense ? wallet.expense.toLocaleString() : "0.00"
                }`}</Typography>
              </Box>
            </>
          ))}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          {t("actions.dismiss")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WalletDetail;
