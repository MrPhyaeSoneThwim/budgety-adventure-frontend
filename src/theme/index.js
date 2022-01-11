import SFProThin from "../assets/fonts/SF-Pro-Text-Thin.otf";
import SFProLight from "../assets/fonts/SF-Pro-Text-Light.otf";
import SFProMedium from "../assets/fonts/SF-Pro-Text-Medium.otf";
import SFProRegular from "../assets/fonts/SF-Pro-Text-Regular.otf";
import SFProSemibold from "../assets/fonts/SF-Pro-Text-Semibold.otf";
import SFProBold from "../assets/fonts/SF-Pro-Text-Bold.otf";
import SFProBlack from "../assets/fonts/SF-Pro-Text-Black.otf";

import { green, grey } from "@mui/material/colors";
import { alpha, createTheme } from "@mui/material/styles";

const { breakpoints, palette, spacing } = createTheme();

export const getTheme = (themeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: { main: green["A400"] },
      background: {
        default: themeMode === "light" ? grey[100] : grey[900],
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: ["SF Pro Text", "sans-serif"].join(","),
    },
    breakpoints: {
      values: {
        ...breakpoints.values,
        lg: 1366,
      },
    },
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 10,
            paddingTop: spacing(0.75),
            paddingBottom: spacing(0.75),
            paddingLeft: spacing(1.5),
            paddingRight: spacing(1.5),
            color: palette.common.white,
            backgroundColor: themeMode === "light" ? grey[900] : grey[600],
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "capitalize",
            padding: `8px 12px`,
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: themeMode === "light" ? alpha(grey[900], 0.5) : alpha(grey[900], 0.8),
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            minHeight: `${spacing(10)} !important`,
            paddingLeft: spacing(2.5),
            paddingRight: spacing(2.5),
            transition: "min-height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          },
        },
      },
      MuiMonthPicker: {
        styleOverrides: {
          root: {
            width: "auto",
          },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            backgroundColor: "transparent",
            padding: spacing(2),
            "&.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus": {
              color: palette.common.white,
              backgroundColor: green["A400"],
            },
          },
        },
      },
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            height: spacing(8),
            backgroundColor: "transparent",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            "&.MuiDialog-paper": {
              borderTopRightRadius: spacing(3),
              borderTopLeftRadius: spacing(3),
              borderBottomLeftRadius: spacing(3),
              borderBottomRightRadius: spacing(3),
            },
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            padding: `16px 24px 12px 24px`,
          },
        },
      },
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            maxWidth: "none",
            padding: "4px 12px 4px",
          },
          label: {
            marginTop: 4,
            fontWeight: 500,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paperWidthSm: {
            maxWidth: "400px",
          },
          paperWidthXs: {
            maxWidth: "320px",
          },
        },
      },
      MuiCalendarPicker: {
        styleOverrides: {
          root: {
            width: "100% !important",
            "& .Mui-selected, & .Mui-selected:focus, & .Mui-selected:hover": {
              color: `${palette.common.white} !important`,
              backgroundColor: `${green["A400"]} !important`,
            },
            "& > div:nth-of-type(2) > div:nth-of-type(1)": {
              paddingLeft: spacing(1.25),
              paddingRight: spacing(1.25),
              justifyContent: "space-between !important",
            },
            "& div[role=presentation]": {
              fontSize: "1.125rem",
            },
            "& div[role=row]": {
              paddingLeft: spacing(1.5),
              paddingRight: spacing(1.5),
              [breakpoints.up("md")]: {
                paddingLeft: spacing(1.25),
                paddingRight: spacing(1.25),
              },
              justifyContent: "space-between !important",
            },
          },
        },
      },

      MuiCssBaseline: {
        styleOverrides: `
           @font-face {
              font-family: 'SF Pro Text';
              font-style: normal;
              font-display: swap;
              font-weight: 100;
              src: url(${SFProThin}) format('otf');
            }

          @font-face {
              font-family: 'SF Pro Text';
              font-style: normal;
              font-display: swap;
              font-weight: 300;
              src: url(${SFProLight}) format('otf');
            }
          @font-face {
              font-family: 'SF Pro Text';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: url(${SFProRegular}) format('otf');
            }
          @font-face {
              font-family: 'SF Pro Text';
              font-style: normal;
              font-display: swap;
              font-weight: 500;
              src: url(${SFProMedium}) format('otf');
            }
           @font-face {
              font-family: 'SF Pro Text';
              font-style: normal;
              font-display: swap;
              font-weight: 600;
              src: url(${SFProSemibold}) format('otf');
            }
           @font-face {
              font-family: 'SF Pro Text';
              font-style: normal;
              font-display: swap;
              font-weight: 700;
              src: url(${SFProBold}) format('otf');
            }
           @font-face {
              font-family: 'SF Pro Text';
              font-style: normal;
              font-display: swap;
              font-weight: 900;
              src: url(${SFProBlack}) format('otf');
            }
        `,
      },
    },
  });
};
