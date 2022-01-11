export const getChartOption = ({
  colors,
  labels,
  total,
  totalLabel,
  alpha,
  palette,
  typography,
}) => {
  return {
    chart: {
      type: "radialBar",
    },
    stroke: {
      curve: "smooth",
      lineCap: "round",
    },
    colors: colors,
    plotOptions: {
      radialBar: {
        track: {
          size: "65%",
          background:
            palette.mode === "light"
              ? alpha(palette.grey[200], 0.8)
              : alpha(palette.common.white, 0.12),
        },
        hollow: {
          margin: 15,
          size: colors.length === 1 ? "74%" : colors.length > 2 ? "55%" : "60%",
        },
        dataLabels: {
          value: {
            offsetY: 8,
            color: palette.text.primary,
            ...typography.button,
          },
          total: {
            show: true,
            label: totalLabel,
            color: palette.text.primary,
            ...typography.subtitle2,
            fontSize: "1rem",
            formatter: function (w) {
              return total.toLocaleString();
            },
          },
        },
      },
    },
    labels: labels,
  };
};

export const getBarChartOptions = ({ translate, typography, colors, labels, palette }) => {
  return {
    chart: {
      stacked: true,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    states: {
      hover: {
        filter: {
          type: "lighten",
          value: 0.04,
        },
      },
      active: {
        filter: {
          type: "darken",
          value: 0.88,
        },
      },
    },
    colors: colors,
    bar: {
      horizontal: false,
      borderRadius: 10,
    },
    grid: {
      strokeDashArray: 3,
      borderColor: palette.divider,
    },
    legend: {
      show: true,
      fontSize: 13,
      position: "top",
      horizontalAlign: "left",
      markers: {
        radius: 12,
      },
      fontWeight: 500,
      itemMargin: { horizontal: 12 },
      labels: {
        colors: palette.text.primary,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "32%",
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      categories: labels,
      labels: {
        style: {
          fontFamily: typography.subtitle2.fontFamily,
          colors: palette.text.primary,
        },
      },
      title: {
        text: translate("dashboard.month-title"),
        offsetX: 0,
        offsetY: 0,
        style: {
          color: palette.text.primary,
          fontFamily: typography.subtitle2.fontFamily,
        },
      },
    },
    // Markers
    markers: {
      size: 0,
      strokeColors: palette.background.paper,
    },
    yaxis: {
      labels: {
        style: {
          fontFamily: typography.subtitle2.fontFamily,
          colors: palette.text.primary,
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      followCursor: true,
      marker: { show: false },
      x: {
        formatter: (x) => {
          return translate(`months.${x}`);
        },
      },
    },
  };
};
