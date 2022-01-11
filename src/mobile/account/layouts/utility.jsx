import React from "react";
import {
  Box,
  List,
  Paper,
  Divider,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRightRounded } from "@mui/icons-material";

import { useTheme, alpha, styled } from "@mui/material/styles";
import { WalletIcon, CategoryIcon } from "../../../assets/icons";

const MuiDivider = styled(Divider)(({ theme: { palette } }) => ({
  borderColor: palette.mode === "light" ? palette.grey[200] : alpha(palette.common.white, 0.12),
}));

const Utility = () => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  return (
    <Box mt={2}>
      <Typography>{t("account.utility")}</Typography>
      <Paper elevation={0} sx={{ mt: 1, borderRadius: 2, overflow: "hidden" }}>
        <List>
          <ListItem sx={{ color: "text.primary" }} to="/categories" component={Link}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <WalletIcon
                size={20}
                color={palette.mode === "light" ? palette.grey[700] : palette.common.white}
              />
            </ListItemIcon>
            <ListItemText primary={t("account.categories")} />
            <ListItemSecondaryAction>
              <ChevronRightRounded />
            </ListItemSecondaryAction>
          </ListItem>
          <MuiDivider variant="fullWidth" />
          <ListItem sx={{ color: "text.primary" }} to="/mobile-wallets" component={Link}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <CategoryIcon
                size={20}
                color={palette.mode === "light" ? palette.grey[700] : palette.common.white}
              />
            </ListItemIcon>
            <ListItemText primary={t("account.wallets")} />
            <ListItemSecondaryAction>
              <ChevronRightRounded />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default Utility;
