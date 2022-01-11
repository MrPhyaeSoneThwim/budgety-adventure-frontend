import {
  Box,
  List,
  Hidden,
  Popover,
  Divider,
  Tooltip,
  ListItem,
  IconButton,
  Typography,
  ListItemText,
  CircularProgress,
  ListItemSecondaryAction,
} from "@mui/material";

import { MobileDatePicker } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { FilterIcon } from "../../../assets/icons";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleRounded } from "@mui/icons-material";
import { useEffect, useState, useCallback } from "react";
import { getChartOption } from "../../../chart/chartOptions";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { getCategoryStats } from "../../../store/actions/categoryActions";

import _ from "lodash";
import React from "react";
import ApexCharts from "react-apexcharts";
import ScrollBar from "../../../shared/scrollBar";
import DateButton from "../../../shared/dateButton";
import StatisticItem from "../components/statisticItem";
import no_content from "../../../assets/images/no_content.png";

const ErrorImg = styled("img")({
  width: "16rem",
});

const Wrapper = styled(Box)(({ theme: { breakpoints, spacing } }) => ({
  minWidth: 0,
  flex: 1,
  display: "flex",
  overflow: "hidden",
  flexDirection: "column",
  [breakpoints.down("md")]: {
    width: "100%",
    borderLeft: "none",
    paddingBottom: spacing(8),
  },
}));

const Header = styled(Box)(({ theme: { spacing, palette, zIndex, breakpoints } }) => ({
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
  [breakpoints.down("md")]: {
    position: "static",
    zIndex: "auto",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: spacing(2.5),
    paddingRight: spacing(2.5),
  },
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

const FilterWrapper = styled(Box)(({ theme: { breakpoints } }) => ({
  display: "inline-flex",
  alignItems: "center",
  [breakpoints.down("md")]: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const FilterButton = styled(IconButton)(({ theme: { palette, spacing } }) => ({
  marginLeft: spacing(1.5),
  backgroundColor: palette.mode === "light" ? palette.grey[300] : alpha(palette.common.white, 0.12),
  "&:hover": {
    backgroundColor:
      palette.mode === "light" ? palette.grey[300] : alpha(palette.common.white, 0.12),
  },
}));

const Chart = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { palette, typography } = useTheme();
  const [pickerOpen, setPickerOpen] = useState(false);

  const { stats, statsList, statsError, statsLoading, success } = useSelector(
    (state) => state.categoryState
  );

  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [query, setQuery] = useState({
    type: "income",
    date: new Date(),
  });

  useEffect(() => {
    setPickerOpen(false);
  }, []);

  const fetchCategoryStats = useCallback(() => {
    let { type, date } = query;
    dispatch(
      getCategoryStats({
        type,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      })
    );
  }, [dispatch, query]);

  useEffect(() => {
    fetchCategoryStats();
  }, [query, dispatch, fetchCategoryStats]);

  useEffect(() => {
    if (success) {
      fetchCategoryStats();
    }
  }, [success, dispatch, fetchCategoryStats]);

  const handleFilterOpen = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleSelect = (option) => {
    setQuery({ ...query, type: option });
    setFilterAnchorEl(null);
  };

  const handleDate = (date) => {
    if (
      date.getMonth() !== query.date.getMonth() ||
      date.getFullYear() !== query.date.getFullYear()
    ) {
      setQuery({ ...query, date: date });
    }
  };

  const handleDateChange = (date) => {
    if (pickerOpen) {
      setQuery({ ...query, date: date });
    }
  };

  return (
    <Wrapper>
      <Header>
        <Hidden mdDown>
          <Typography sx={{ fontWeight: "600" }} variant="h6">
            {t("statistic.title")}
          </Typography>
        </Hidden>
        <FilterWrapper>
          <MobileDatePicker
            value={query.date}
            label="Date mobile"
            showToolbar={false}
            inputFormat="MMM YYY"
            onAccept={handleDate}
            onChange={handleDateChange}
            showTodayButton={false}
            views={["year", "month"]}
            disableHighlightToday={true}
            renderInput={({ inputProps }) => {
              return <DateButton inputProps={inputProps} />;
            }}
          />
          <Tooltip title={t("statistic.filter")}>
            <FilterButton onClick={handleFilterOpen}>
              <FilterIcon
                size={20}
                color={palette.mode === "light" ? palette.grey[700] : palette.common.white}
              />
            </FilterButton>
          </Tooltip>
          <Popover
            disableRestoreFocus
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterClose}
          >
            <List sx={{ py: 0 }}>
              {["income", "expense"].map((option, index) => {
                return (
                  <Box key={index}>
                    <ListItem
                      button
                      key={index}
                      sx={{ py: 0.5 }}
                      onClick={() => handleSelect(option)}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            variant="body1"
                            sx={(theme) => ({
                              mr: 4,
                              fontWeight: 500,
                              textTransform: "capitalize",
                              [theme.breakpoints.down("md")]: {
                                mr: 8,
                              },
                            })}
                          >
                            {t(`statistic.${option}`)}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <CheckCircleRounded
                          fontSize="small"
                          sx={{
                            mb: -0.5,
                            color: "primary.main",
                            visibility: option === query.type ? "visible" : "hidden",
                          }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index !== 1 && (
                      <Divider
                        variant="fullWidth"
                        sx={(theme) => ({
                          borderColor:
                            theme.palette.mode === "light"
                              ? theme.palette.grey[200]
                              : alpha(theme.palette.common.white, 0.12),
                        })}
                      />
                    )}
                  </Box>
                );
              })}
            </List>
          </Popover>
        </FilterWrapper>
      </Header>

      {(statsLoading && (
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
        (statsError && (
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
              {statsError}
            </Typography>
          </Box>
        )) ||
        (stats && (
          <ScrollBar
            sx={{
              px: 2,
              pb: 2,
              flex: 1,
              display: "flex",
              overflowY: "auto",
              flexDirection: "column",
            }}
          >
            <ChartWrapper>
              <ApexCharts
                height={280}
                type="radialBar"
                options={getChartOption({
                  alpha,
                  palette,
                  typography,
                  total: stats.total,
                  totalLabel: t("statistic.total"),
                  colors: _.map(stats.categoryStats, "iconColor"),
                  labels: _.map(stats.categoryStats, "name"),
                })}
                series={_.map(stats.categoryStats, "percent")}
              />
              <Box
                sx={(theme) => ({
                  pr: 4,
                  pl: 2,
                  flex: 1,
                  [theme.breakpoints.down("sm")]: { width: "100%", px: 1 },
                })}
              >
                {stats.categoryStats.map((stat, index) => (
                  <LabelWrapper key={index}>
                    <Box
                      sx={(theme) => ({
                        display: "inline-flex",
                        alignItems: "center",
                        [theme.breakpoints.down("sm")]: {
                          flex: 1,
                          display: "flex",
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
                          backgroundColor: stat.iconColor,
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
                        {stat.name}
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
                      {stat.amount.toLocaleString()}
                    </Typography>
                  </LabelWrapper>
                ))}
              </Box>
            </ChartWrapper>

            <List sx={(theme) => ({ px: 2, [theme.breakpoints.down("md")]: { px: 0 } })}>
              {statsList.map((statList) => (
                <StatisticItem statistic={statList} key={statList._id} />
              ))}
            </List>
          </ScrollBar>
        ))}
    </Wrapper>
  );
};

export default Chart;
