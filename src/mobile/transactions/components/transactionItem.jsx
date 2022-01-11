import _ from "lodash";
import {
  Box,
  List,
  Avatar,
  Drawer,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { categoryIcons } from "../../../utils/constants";
import { ChevronRightRounded } from "@mui/icons-material";
import { TrashIcon, AddIcon, ViewMoreIcon } from "../../../assets/icons";

const LIST_ITEM_GUTTER = 8;
const ListItemStyle = styled(ListItem)(({ theme: { palette, spacing } }) => ({
  height: spacing(8),
  borderRadius: spacing(2),
  paddingTop: spacing(0.5),
  paddingBottom: spacing(0.5),
  paddingLeft: spacing(1.5),
  paddingRight: spacing(1.5),
  marginBottom: LIST_ITEM_GUTTER,
  backgroundColor: palette.mode === "light" ? palette.common.white : palette.grey[800],
}));

const TransactionItem = ({
  transaction: {
    _id,
    status,
    amount,
    category: { icon, iconColor, name },
  },
  onEdit,
  onDelete,
  onViewMore,
}) => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const [isActionOpen, setIsActionOpen] = useState(false);

  const handleActionOpen = () => {
    setIsActionOpen(true);
  };

  const handleActionClose = () => {
    setIsActionOpen(false);
  };

  const handleEdit = () => {
    onEdit(_id);
    handleActionClose();
  };

  const handleDelete = () => {
    onDelete(_id);
    handleActionClose();
  };

  const handleViewMore = () => {
    onViewMore(_id);
    handleActionClose();
  };

  const Icon = _.find(categoryIcons, (category) => category.name === icon).icon;
  const transactionAmount =
    status === "income" ? `+${amount.toLocaleString()}` : `-${amount.toLocaleString()}`;

  return (
    <>
      <ListItemStyle
        button
        onClick={handleActionOpen}
        secondaryAction={<ChevronRightRounded sx={{ mb: -0.5 }} />}
      >
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: iconColor }}>
            <Icon size={20} color={palette.common.white} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          secondary={transactionAmount}
          primary={<Typography sx={{ fontWeight: 500 }}>{name}</Typography>}
          secondaryTypographyProps={{
            sx: { fontWeight: 500 },
            color: status === "income" ? "primary" : "error",
          }}
        />
      </ListItemStyle>
      <Drawer anchor="bottom" open={isActionOpen} onClose={handleActionClose}>
        <Box sx={{ pt: 2, pb: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box
            sx={(theme) => ({
              width: theme.spacing(4),
              height: theme.spacing(0.75),
              borderRadius: theme.spacing(2),
              backgroundColor: theme.palette.grey[300],
            })}
          ></Box>
        </Box>
        <List
          sx={{
            py: 0,
          }}
        >
          <ListItem onClick={handleEdit} sx={{ py: 1 }} button>
            <ListItemIcon
              sx={(theme) => ({
                minWidth: theme.spacing(5),
              })}
            >
              <AddIcon
                size={24}
                color={palette.mode === "light" ? palette.grey[700] : palette.common.white}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "1rem" }}>
                  {t("actions.menu-options.edit")}
                </Typography>
              }
            />
          </ListItem>
          <ListItem onClick={handleDelete} sx={{ py: 1 }} button>
            <ListItemIcon
              sx={(theme) => ({
                minWidth: theme.spacing(5),
              })}
            >
              <TrashIcon
                size={24}
                color={palette.mode === "light" ? palette.grey[700] : palette.common.white}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "1rem" }}>
                  {t("actions.menu-options.delete")}
                </Typography>
              }
            />
          </ListItem>
          <ListItem onClick={handleViewMore} sx={{ py: 1 }} button>
            <ListItemIcon
              sx={(theme) => ({
                minWidth: theme.spacing(5),
              })}
            >
              <ViewMoreIcon
                size={24}
                color={palette.mode === "light" ? palette.grey[700] : palette.common.white}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "1rem" }}>
                  {t("actions.menu-options.viewmore")}
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default TransactionItem;
