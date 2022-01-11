import { alpha, useTheme } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";

export default function BasicChartStyle() {
  const theme = useTheme();

  const SHADOW_COLOR =
    theme.palette.mode === "light" ? theme.palette.grey[500] : theme.palette.grey[800];

  const background = {
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
    backgroundColor: alpha(theme.palette.background.default, 0.72),
  };

  return (
    <GlobalStyles
      styles={{
        "&.apexcharts-canvas": {
          // Tooltip
          ".apexcharts-xaxistooltip": {
            ...background,
            border: 0,
            boxShadow: `0 0 4px 0 ${alpha(SHADOW_COLOR, 0.24)}, 0 24px 48px 0 ${alpha(
              SHADOW_COLOR,
              0.24
            )}`,
            borderRadius: 12,
            color: theme.palette.text.primary,
            "&:before": { borderBottomColor: "transparent" },
            "&:after": { borderBottomColor: alpha(theme.palette.background.default, 0.72) },
          },
          ".apexcharts-tooltip.apexcharts-theme-light": {
            ...background,
            border: 0,
            boxShadow: `0 0 4px 0 ${alpha(SHADOW_COLOR, 0.24)}, 0 24px 48px 0 ${alpha(
              SHADOW_COLOR,
              0.24
            )}`,
            borderRadius: 12,
            "& .apexcharts-tooltip-title": {
              border: 0,
              textAlign: "center",
              fontWeight: theme.typography.fontWeightBold,
              backgroundColor: alpha("#919EAB", 0.16),
              color: theme.palette.text[theme.palette.mode === "light" ? "secondary" : "primary"],
            },
          },
          // Legend
          ".apexcharts-legend": {
            padding: 0,
          },
          ".apexcharts-legend-series": {
            display: "flex !important",
            alignItems: "center",
          },
          ".apexcharts-legend-marker": {
            marginRight: 8,
          },
          ".apexcharts-legend-text": {
            lineHeight: "18px",
            textTransform: "capitalize",
          },
        },
      }}
    />
  );
}
