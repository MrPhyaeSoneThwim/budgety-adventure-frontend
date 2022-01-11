import { MobileDatePicker } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import { useState, useEffect, useCallback } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { getAnnualStats } from "../../../store/actions/transActions";

import _ from "lodash";
import ApexChart from "react-apexcharts";
import DateButton from "../../../shared/dateButton";
import no_content from "../../../assets/images/no_content.png";
import { getBarChartOptions } from "../../../chart/chartOptions";

const ErrorImg = styled("img")({
  width: "16rem",
});

const Header = styled(Box)(({ theme: { spacing } }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingLeft: spacing(3),
  paddingRight: spacing(3),
}));

export default function StatsYear() {
  const { palette, typography } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { success, annualStats, annualStatsError, annualStatsLoading } = useSelector(
    (state) => state.transState
  );

  const [date, setDate] = useState(new Date());
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    setPickerOpen(false);
  }, []);

  const fetchStatistic = useCallback(() => {
    dispatch(getAnnualStats({ year: date.getFullYear() }));
  }, [date, dispatch]);

  useEffect(() => {
    fetchStatistic();
  }, [date, fetchStatistic]);

  useEffect(() => {
    if (success) {
      fetchStatistic();
    }
  }, [success, fetchStatistic]);

  const handleDate = (newDate) => {
    if (newDate.getFullYear() !== date.getFullYear()) {
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
        <Typography sx={{ fontWeight: 500 }}>{t("dashboard.yearly")}</Typography>
        <MobileDatePicker
          value={date}
          inputFormat="YYY"
          views={["year"]}
          label="Date mobile"
          showTodayButton={false}
          showToolbar={false}
          disableHighlightToday={true}
          onChange={handleDateChange}
          onAccept={handleDate}
          renderInput={({ inputProps }) => {
            return <DateButton inputProps={inputProps} />;
          }}
        />
      </Header>
      <Box sx={{ overflow: "hidden", mt: 1 }}>
        {(annualStatsLoading && (
          <Box
            sx={{
              py: 10,
              px: 3,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        )) ||
          (annualStatsError && (
            <Box
              sx={{
                py: 4,
                px: 3,
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <ErrorImg src={no_content} alt="empty content" />
              <Typography sx={{ fontSize: "1.05rem", fontWeight: 500, mt: -2 }}>
                {annualStatsError}
              </Typography>
            </Box>
          )) ||
          (annualStats && (
            <Box px={1.5} width="100%">
              <ApexChart
                height={350}
                options={getBarChartOptions({
                  palette,
                  typography,
                  translate: t,
                  labels: _.map(annualStats, "month"),
                  colors: [palette.primary.main, palette.error.main],
                })}
                series={[
                  {
                    name: t("dashboard.income"),
                    data: _.map(annualStats, "income"),
                  },
                  {
                    name: t("dashboard.expense"),
                    data: _.map(annualStats, "expense"),
                  },
                ]}
                type="bar"
                width="100%"
              />
            </Box>
          ))}
      </Box>
    </>
  );
}
