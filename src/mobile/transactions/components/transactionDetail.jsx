import {
  Box,
  Chip,
  Drawer,
  Button,
  Divider,
  Typography,
  DialogActions,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import { walletIcons } from "../../../utils/constants";
import { getTransaction } from "../../../store/actions/transActions";

import _ from "lodash";
import React from "react";
import no_content from "../../../assets/images/no_content.png";

const ErrorImg = styled("img")({
  width: "16rem",
});

const Wallet = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
});

const IconWrapper = styled(Box)(({ theme: { spacing, palette } }) => ({
  padding: spacing(1),
  borderRadius: "50%",
  alignItems: "center",
  display: "inline-flex",
  justifyContent: "center",
  color: palette.common.white,
}));

const TransactionDetail = ({ detailId, onClose }) => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { transaction, getTranLoading, getTranError } = useSelector((state) => state.transState);

  useEffect(() => {
    if (detailId) {
      dispatch(getTransaction(detailId));
    }
  }, [dispatch, detailId]);

  const renderWallet = (icon) => {
    const Icon = _.find(walletIcons, (walletIcon) => walletIcon.name === icon).icon;
    return <Icon size={20} color={palette.common.white} />;
  };
  return (
    <Drawer anchor="bottom" onClose={onClose} open={!!detailId}>
      <DialogContent>
        {(getTranLoading && (
          <Box sx={{ py: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress color="primary" />
          </Box>
        )) ||
          (getTranError && (
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
                {getTranError}
              </Typography>
            </Box>
          )) ||
          (transaction && (
            <>
              <Wallet>
                <IconWrapper
                  sx={{
                    backgroundColor: transaction.wallet.iconColor,
                  }}
                >
                  {renderWallet(transaction.wallet.icon)}
                </IconWrapper>
                <Typography sx={{ fontWeight: 600, mt: 1 }} variant="h6">
                  {transaction.wallet.name}
                </Typography>
              </Wallet>
              <Box
                sx={{
                  mt: 1,
                  alignItems: "center",
                  py: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="subtitle1">
                  {t("dashboard.transaction-detail.status")}
                </Typography>
                <Chip
                  sx={{
                    textTransform: "capitalize",
                    color: palette.common.white,
                    backgroundColor:
                      transaction.status === "income" ? palette.primary.main : palette.error.main,
                  }}
                  label={t(`dashboard.${transaction.status}`)}
                />
              </Box>
              <Divider />
              <Box
                sx={{
                  py: 1,
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="subtitle1">{t("dashboard.amount")}</Typography>
                <Typography>{transaction.amount.toLocaleString()}</Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  py: 1,
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="subtitle1">
                  {t("dashboard.transaction-detail.category")}
                </Typography>
                <Typography>{transaction.category.name}</Typography>
              </Box>
            </>
          ))}
      </DialogContent>
      <DialogActions sx={{ px: 2 }}>
        <Button color="primary" onClick={onClose}>
          {t("actions.dismiss")}
        </Button>
      </DialogActions>
    </Drawer>
  );
};

export default TransactionDetail;
