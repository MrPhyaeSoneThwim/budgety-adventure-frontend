import React from "react";
import { Toolbar, Typography, useScrollTrigger, AppBar as MuiAppBar } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

const AppBar = ({ window, title, action }) => {
  const { spacing, palette, breakpoints } = useTheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  const appBarStyle = {
    boxShadow: "none",
    backdropFilter: "blur(6px)",
    backgroundColor:
      palette.mode === "light" ? alpha(palette.grey[100], 0.8) : alpha(palette.grey[900], 0.8),
    transition: "background-color 250ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;",
  };

  const scrollToolbarStyle = {
    minHeight: `${spacing(8)} !important`,
    [breakpoints.down("sm")]: {
      minHeight: `${spacing(7)} !important`,
    },
  };

  const titleStyle = {
    fontWeight: 700,
    fontSize: "1.5rem",
    transition: "font-size 350ms ease 0ms",
  };

  const scrollTitleStyle = {
    fontWeight: 700,
    fontSize: "1.15rem",
  };

  return (
    <MuiAppBar elevation={0} position="sticky" sx={{ ...appBarStyle }}>
      <Toolbar sx={{ ...(trigger && scrollToolbarStyle) }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ ...titleStyle, ...(trigger && scrollTitleStyle) }}
        >
          {title}
        </Typography>
        {action && action}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
