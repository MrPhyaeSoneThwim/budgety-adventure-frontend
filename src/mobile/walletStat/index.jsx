import React from "react";
import Helmet from "../../common/helmet";
import ApexCharts from "react-apexcharts";
import BackAppBar from "../../common/backAppBar";
import no_content from "../../assets/images/no_content.png";
import Transaction from "../../desktop/wallets/components/transaction";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { getChartOption } from "../../chart/chartOptions";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { getWalletStat } from "../../store/actions/walletActions";
import { Box, Typography, CircularProgress } from "@mui/material";

const ErrorImg = styled("img")({
  width: "16rem",
});

const ChartWrapper = styled(Box)(({ theme: { breakpoints } }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  width: "100%",
  [breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
}));

const LabelWrapper = styled(Box)({
  display: "flex",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between",
});

const WalletStats = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { palette, typography } = useTheme();
  const { stats, transactions, statsError, statsLoading } = useSelector(
    (state) => state.walletState
  );

  useEffect(() => {
    if (id) {
      dispatch(getWalletStat(id));
    }
  }, [id, dispatch]);

  return (
    <>
      <Helmet title="Wallet Statistic" />
      <BackAppBar path="/mobile-wallets" title={t("statistic.title")} />
      <Box sx={{ px: 2 }}>
        {(statsLoading && (
          <Box
            sx={{
              py: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        )) ||
          (statsError && (
            <Box
              sx={{
                py: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ErrorImg src={no_content} alt="error" />
              <Typography sx={{ fontSize: "1.05rem", fontWeight: 500, mt: -2 }}>
                {statsError}
              </Typography>
            </Box>
          )) ||
          (stats && (
            <>
              <ChartWrapper>
                <ApexCharts
                  height={280}
                  type="radialBar"
                  series={[stats.incomeRate, stats.expenseRate]}
                  options={getChartOption({
                    alpha,
                    palette,
                    typography,
                    total: stats.difference,
                    totalLabel: t("wallets.difference"),
                    colors: [palette.primary.main, palette.error.main],
                    labels: [t("wallets.income"), t("wallets.expense")],
                  })}
                />
                <Box
                  sx={(theme) => ({
                    px: 4,
                    flex: 1,
                    [theme.breakpoints.down("sm")]: { width: "100%", px: 1 },
                  })}
                >
                  <LabelWrapper>
                    <Box
                      sx={(theme) => ({
                        display: "inline-flex",
                        alignItems: "center",
                        [theme.breakpoints.down("sm")]: {
                          display: "flex",
                          flex: 1,
                        },
                      })}
                    >
                      <Box
                        sx={(theme) => ({
                          width: "12px",
                          height: "12px",
                          border: "none",
                          marginRight: "12px",
                          borderRadius: "50%",
                          backgroundColor: palette.primary.main,
                          [theme.breakpoints.down("sm")]: {
                            width: theme.spacing(1),
                            height: theme.spacing(3),
                            borderRadius: 4,
                          },
                        })}
                      />
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        sx={(theme) => ({
                          fontWeight: 500,
                          textTransform: "capitalize",
                          [theme.breakpoints.down("sm")]: {
                            fontSize: "1rem",
                            fontWeight: 700,
                          },
                        })}
                      >
                        {t("wallets.income")}
                      </Typography>
                    </Box>
                    <Typography
                      sx={(theme) => ({
                        fontSize: "1rem",
                        [theme.breakpoints.down("sm")]: {
                          fontSize: "1rem",
                          fontWeight: "medium",
                        },
                      })}
                      variant="body1"
                    >
                      {stats.income ? stats.income.toLocaleString() : "0.00"}
                    </Typography>
                  </LabelWrapper>
                  <LabelWrapper>
                    <Box
                      sx={(theme) => ({
                        display: "inline-flex",
                        alignItems: "center",
                        [theme.breakpoints.down("sm")]: {
                          display: "flex",
                          flex: 1,
                        },
                      })}
                    >
                      <Box
                        sx={(theme) => ({
                          width: "12px",
                          height: "12px",
                          border: "none",
                          marginRight: "12px",
                          borderRadius: "50%",
                          backgroundColor: palette.error.main,
                          [theme.breakpoints.down("sm")]: {
                            width: theme.spacing(1),
                            height: theme.spacing(3),
                            borderRadius: 4,
                          },
                        })}
                      />
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        sx={(theme) => ({
                          fontWeight: 500,
                          textTransform: "capitalize",
                          [theme.breakpoints.down("sm")]: {
                            fontSize: "1rem",
                            fontWeight: 700,
                          },
                        })}
                      >
                        {t("wallets.expense")}
                      </Typography>
                    </Box>
                    <Typography
                      sx={(theme) => ({
                        fontSize: "1rem",
                        [theme.breakpoints.down("sm")]: {
                          fontSize: "1rem",
                          fontWeight: "medium",
                        },
                      })}
                      variant="body1"
                    >
                      {stats.expense ? stats.expense.toLocaleString() : "0.00"}
                    </Typography>
                  </LabelWrapper>
                </Box>
              </ChartWrapper>
              <Box my={2}>
                {transactions.map((transaction, index) => (
                  <Transaction key={index} transaction={transaction} />
                ))}
              </Box>
            </>
          ))}
      </Box>
    </>
  );
};

export default WalletStats;
