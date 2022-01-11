import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Typography, ListItem, ListItemText, ListItemAvatar } from "@mui/material";

import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";

const LIST_ITEM_GUTTER = 8;
const ListItemStyle = styled(ListItem)(({ theme: { palette, spacing } }) => ({
  borderRadius: spacing(2),
  paddingLeft: spacing(1),
  paddingTop: spacing(0.25),
  paddingBottom: spacing(0.25),
  paddingRight: spacing(1),
  marginBottom: LIST_ITEM_GUTTER,
  backgroundColor: palette.mode === "light" ? palette.common.white : palette.grey[800],
}));

const StatisticItem = ({ statistic }) => {
  const { palette } = useTheme();
  return (
    <ListItemStyle>
      <ListItemAvatar
        sx={(theme) => ({
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: theme.spacing(2.5),
        })}
      >
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            size={50}
            thickness={5}
            sx={{
              position: "absolute",
              color: palette.grey[palette.mode === "light" ? 200 : 700],
            }}
            value={100}
            variant="determinate"
          />
          <CircularProgress
            size={50}
            thickness={5}
            sx={{
              color: statistic.iconColor,
              [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: "round",
              },
            }}
            value={Math.round(statistic.percent)}
            variant="determinate"
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              {`${Math.round(statistic.percent)}%`}
            </Typography>
          </Box>
        </Box>
      </ListItemAvatar>
      <ListItemText
        sx={{ ml: 1.5 }}
        primary={
          <Typography sx={{ textTransform: "capitalize", fontWeight: 600 }}>
            {statistic.name}
          </Typography>
        }
        secondary={
          <Typography sx={{ mt: 0.25 }} color="textSecondary">
            {statistic.amount.toLocaleString()}/ {statistic.total.toLocaleString()}
          </Typography>
        }
      />
    </ListItemStyle>
  );
};

export default StatisticItem;
