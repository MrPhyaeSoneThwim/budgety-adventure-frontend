import { MobileDatePicker } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { getChartOption } from "../../../chart/chartOptions";
import { alpha, styled, useTheme } from "@mui/material/styles";
import { getMonthStats } from "../../../store/actions/transActions";
import { Box, Typography, CircularProgress } from "@mui/material";

import React from "react";
import ApexCharts from "react-apexcharts";
import DateButton from "../../../shared/dateButton";
import no_content from "../../../assets/images/no_content.png";

const ErrorImg = styled("img")({
  width: "16rem",
});

const Header = styled(Box)(({ theme: { spacing } }) => ({
  display: "flex",
  alignItems: "center",
  paddingLeft: spacing(3),
  paddingRight: spacing(3),
  justifyContent: "space-between",
}));

const Content = styled(Box)(({ theme: { spacing } }) => ({
  paddingLeft: spacing(3),
  paddingRight: spacing(3),
  display: "flex",
  alignItems: "center",
}));

const LabelWrapper = styled(Box)({
  display: "flex",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between",
});

const ChartWrapper = styled(Box)(({ theme: { spacing, breakpoints } }) => ({
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

const StatsMonth = () => {
  const { t } = useTranslation();
  const { palette, typography } = useTheme();
  const dispatch = useDispatch();

  const { monthStats, success, monthStatsLoading, monthStatsError } = useSelector(
    (state) => state.transState
  );

  const [date, setDate] = useState(new Date());
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    setPickerOpen(false);
  }, []);

  const fetchStatistic = useCallback(() => {
    dispatch(getMonthStats({ month: date.getMonth() + 1, year: date.getFullYear() }));
  }, [dispatch, date]);

  useEffect(() => {
    fetchStatistic();
  }, [date, fetchStatistic]);

  useEffect(() => {
    if (success) {
      fetchStatistic();
    }
  }, [success, fetchStatistic]);

  const handleDate = (newDate) => {
    if (newDate.getMonth() !== date.getMonth() || newDate.getFullYear() !== date.getFullYear()) {
      setDate(newDate);
    }
  };

  const handleDateChange = (newDate) => {
    if (pickerOpen) {
      setDate(newDate);
    }
  };

  return (
    <>
      <Header>
        <Typography sx={{ fontWeight: "500" }}>{t("dashboard.monthly")}</Typography>
        <MobileDatePicker
          value={date}
          label="Date mobile"
          inputFormat="MMM YYY"
          showTodayButton={false}
          showToolbar={false}
          views={["year", "month"]}
          disableHighlightToday={true}
          onChange={handleDateChange}
          onAccept={handleDate}
          renderInput={({ inputProps }) => {
            return <DateButton inputProps={inputProps} />;
          }}
        />
      </Header>
      <Content>
        {(monthStatsLoading && (
          <Box
            sx={{
              py: 10,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        )) ||
          (monthStatsError && (
            <Box
              sx={{
                py: 4,
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <ErrorImg src={no_content} alt="empty content" />
              <Typography sx={{ fontSize: "1.05rem", fontWeight: 500, mt: -2 }}>
                {monthStatsError}
              </Typography>
            </Box>
          )) ||
          (monthStats && (
            <ChartWrapper>
              <ApexCharts
                height={280}
                type="radialBar"
                options={getChartOption({
                  alpha,
                  palette,
                  typography,
                  total: monthStats.difference,
                  totalLabel: t("wallets.difference"),
                  colors: [palette.primary.main, palette.error.main],
                  labels: [t("dashboard.income"), t("dashboard.expense")],
                })}
                series={[monthStats.incomeRate, monthStats.expenseRate]}
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
                        backgroundColor: theme.palette.primary.main,
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
                      {t("dashboard.income")}
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
                    {monthStats.income ? monthStats.income.toLocaleString() : "0.00"}
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
                        backgroundColor: theme.palette.error.main,
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
                      {t("dashboard.expense")}
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
                    {monthStats.expense ? monthStats.expense.toLocaleString() : "0.00"}
                  </Typography>
                </LabelWrapper>
              </Box>
            </ChartWrapper>
          ))}
      </Content>
    </>
  );
};

export default StatsMonth;
