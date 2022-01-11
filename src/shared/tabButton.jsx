import React from "react";
import { Button } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";

const TabButton = ({ name, label, value, activeValue, onChange }) => {
  const { spacing, palette } = useTheme();
  const active = value === activeValue;

  const defaultStyle = {
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingTop: spacing(1),
    paddingBottom: spacing(1),
    borderRadius: spacing(6),
    marginRight: spacing(0.5),
    fontWeight: 600,
    color: palette.mode === "light" ? palette.grey[700] : palette.common.white,
    "&:hover": {
      backgroundColor: "transparent",
    },
  };

  const activeStyle = {
    color: palette.primary.main,
    backgroundColor:
      palette.mode === "light" ? palette.grey[100] : alpha(palette.common.white, 0.12),
    "&:hover": {
      backgroundColor:
        palette.mode === "light" ? palette.grey[100] : alpha(palette.common.white, 0.12),
    },
  };

  const handleChange = () => {
    onChange(name, value);
  };

  return (
    <Button
      color="info"
      onClick={handleChange}
      sx={{ ...defaultStyle, ...(active && activeStyle) }}
    >
      {label}
    </Button>
  );
};

export default TabButton;
