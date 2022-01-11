import React from "react";
import ApexCharts from "react-apexcharts";
import ScrollBar from "../../../shared/scrollBar";
import Transaction from "../components/transaction";
import no_content from "../../../assets/images/no_content.png";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getChartOption } from "../../../chart/chartOptions";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { Box, Typography, Hidden, CircularProgress } from "@mui/material";

const ErrorImg = styled("img")({
  width: "16rem",
});

const Wrapper = styled(Box)(({ theme: { breakpoints, spacing, palette } }) => ({
  minWidth: 0,
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderLeft: `1px solid ${
    palette.mode === "light" ? palette.grey[300] : alpha(palette.common.white, 0.12)
  }`,
  [breakpoints.down("md")]: {
    paddingBottom: spacing(8),
  },
}));

const Header = styled(Box)(({ theme: { spacing, palette, zIndex } }) => ({
  top: 0,
  flexShrink: 0,
  position: "sticky",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  zIndex: zIndex.appBar,
  paddingLeft: spacing(3),
  paddingRight: spacing(3),
  paddingTop: spacing(2),
  paddingBottom: spacing(2),
  backdropFilter: "blur(6px)",
  backgroundColor: alpha(palette.background.default, 0.8),
}));

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
  const { t } = useTranslation();
  const { palette, typography } = useTheme();
  const { stats, transactions, statsError, statsLoading } = useSelector(
    (state) => state.walletState
  );

  return (
    <Hidden mdDown>
      <Wrapper>
        <Header>
          <Typography sx={{ fontWeight: "600" }} variant="h6">
            {t("wallets.statistic")}
          </Typography>
        </Header>
        <ScrollBar
          sx={{
            px: 2,
            pb: 2,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
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
            (!statsError && !statsLoading && !stats && !transactions.length > 0 && (
              <Box
                sx={{
                  py: 4,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <ErrorImg src={no_content} alt="error" />
                <Typography sx={{ fontSize: "1.05rem", fontWeight: 500, mt: -2 }}>
                  No wallets selected.
                </Typography>
              </Box>
            )) || (
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
                            [theme.breakpoints.down("sm")]: {
                              width: theme.spacing(1),
                              height: theme.spacing(3),
                              borderRadius: 4,
                            },
                            backgroundColor: palette.primary.main,
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
                            [theme.breakpoints.down("sm")]: {
                              width: theme.spacing(1),
                              height: theme.spacing(3),
                              borderRadius: 4,
                            },
                            backgroundColor: palette.error.main,
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
                {transactions.map((transaction, index) => (
                  <Transaction key={index} transaction={transaction} />
                ))}{" "}
              </>
            )}
        </ScrollBar>
      </Wrapper>
    </Hidden>
  );
};

export default WalletStats;
