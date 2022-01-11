import _ from "lodash";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { IconButton, Typography, Box } from "@mui/material";
import { categoryIcons, walletIcons } from "../utils/constants";
const SelectIcon = ({ icon, iconType, name, value, label, selected, onChange, iconBackground }) => {
  const active = value === selected;
  const theme = useTheme();

  const Icon = _.find(
    iconType === "category" ? categoryIcons : walletIcons,
    (iconItem) => iconItem.name === icon
  ).icon;

  const handleChange = () => {
    onChange(name, value);
  };
  return (
    <Box
      sx={{
        mb: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        onClick={handleChange}
        sx={{
          mb: 0.5,
          "&, &:hover": {
            backgroundColor: active ? iconBackground : "transparent",
          },
        }}
      >
        {
          <Icon
            size={20}
            color={
              active
                ? theme.palette.common.white
                : theme.palette.mode === "light"
                ? theme.palette.grey[600]
                : theme.palette.common.white
            }
          />
        }
      </IconButton>
      {label && <Typography variant="caption">{label}</Typography>}
    </Box>
  );
};

export default React.memo(SelectIcon);
