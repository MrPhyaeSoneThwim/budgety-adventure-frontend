import _ from "lodash";
import React from "react";
import {
  List,
  Button,
  Dialog,
  Avatar,
  ListItem,
  DialogTitle,
  ListItemText,
  DialogContent,
  DialogActions,
  ListItemAvatar,
  ListItemSecondaryAction,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CheckCircleRounded } from "@mui/icons-material";
import { walletIcons } from "../../../utils/constants";

const SelectWallet = ({ open, name, wallets, onClose, onChange, selected }) => {
  const { palette } = useTheme();
  const { t } = useTranslation();

  const handleWallet = (value) => {
    onChange(name, value);
  };

  return (
    <Dialog fullWidth open={open} maxWidth="xs" onClose={onClose}>
      <DialogTitle>{t("dashboard.select-wallet")}</DialogTitle>
      <DialogContent>
        <List>
          {wallets.map((wallet) => {
            const Icon = _.find(walletIcons, { name: wallet.icon }).icon;
            return (
              <ListItem
                button
                key={wallet._id}
                selected={wallet._id === selected}
                onClick={() => handleWallet(wallet._id)}
                sx={{ borderRadius: "16px", mb: 0.5, px: 1.25 }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={(theme) => ({
                      backgroundColor: wallet.color,
                      color: theme.palette.common.white,
                    })}
                  >
                    {<Icon size={24} color={palette.common.white} />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={wallet.name} />
                {wallet._id === selected && (
                  <ListItemSecondaryAction>
                    <CheckCircleRounded sx={{ color: "primary.main", mb: -0.5 }} />
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          {t("actions.dismiss")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectWallet;
