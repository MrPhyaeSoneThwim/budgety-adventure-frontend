import React from "react";

import StatsYear from "../components/statsYear";
import StatsMonth from "../components/statsMonth";
import ScrollBar from "../../../shared/scrollBar";

import { useTranslation } from "react-i18next";
import { alpha, styled } from "@mui/material/styles";
import { Box, Typography, Hidden, Divider } from "@mui/material";

const ChartLayout = styled(Box)(({ theme: { breakpoints, spacing } }) => ({
  minWidth: 0,
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  [breakpoints.down("md")]: {
    paddingBottom: spacing(8),
  },
}));

const Header = styled(Box)(({ theme: { spacing, palette, zIndex } }) => ({
  flexShrink: 0,
  display: "flex",
  position: "sticky",
  top: 0,
  zIndex: zIndex.appBar,
  paddingLeft: spacing(3),
  paddingRight: spacing(3),
  paddingTop: spacing(2),
  paddingBottom: spacing(2),
  backdropFilter: "blur(6px)",
  backgroundColor: alpha(palette.background.default, 0.8),
}));

const Content = styled(Box)({
  flex: 1,
  position: "relative",
  display: "flex",
  overflow: "hidden",
});

const Charts = () => {
  const { t } = useTranslation();
  return (
    <ChartLayout>
      <Hidden mdDown>
        <Header>
          <Typography sx={{ fontWeight: 600 }} variant="h6">
            {t("dashboard.title")}
          </Typography>
        </Header>
      </Hidden>
      <Content>
        <ScrollBar autoHide={true} timeout={500}>
          <StatsMonth />
          <Box px={3} py={2}>
            <Divider variant="fullWidth" />
          </Box>
          <StatsYear />
        </ScrollBar>
      </Content>
    </ChartLayout>
  );
};

export default Charts;
