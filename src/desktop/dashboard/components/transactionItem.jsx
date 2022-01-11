import _ from "lodash";
import {
  List,
  Avatar,
  Divider,
  Popover,
  ListItem,
  IconButton,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { styled, alpha } from "@mui/material/styles";
import { MoreHorizRounded } from "@mui/icons-material";
import { categoryIcons } from "../../../utils/constants";
import { TrashIcon, EditIcon, ViewMoreIcon } from "../../../assets/icons";

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

const MuiDivider = styled(Divider)(({ theme: { palette } }) => ({
  borderColor: palette.mode === "light" ? palette.grey[200] : alpha(palette.common.white, 0.12),
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
  const [anchorEl, setAnchorEl] = useState(null);

  const handleEdit = () => {
    onEdit(_id);
    setAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete(_id);
    setAnchorEl(null);
  };

  const handleViewMore = () => {
    onViewMore(_id);
    setAnchorEl(null);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Icon = _.find(categoryIcons, (category) => category.name === icon).icon;

  const transactionAmount =
    status === "income" ? `+${amount.toLocaleString()}` : `-${amount.toLocaleString()}`;

  return (
    <ListItemStyle
      secondaryAction={
        <>
          <IconButton size="small" edge="end" aria-label="dropdown" onClick={handleOpen}>
            <MoreHorizRounded />
          </IconButton>
          <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            onClose={handleClose}
            open={Boolean(anchorEl)}
          >
            <List
              sx={{
                py: 0,
              }}
            >
              <ListItem onClick={handleEdit} sx={{ py: 1 }} button>
                <ListItemIcon
                  sx={(theme) => ({
                    minWidth: theme.spacing(4.5),
                  })}
                >
                  <EditIcon
                    size={20}
                    color={palette.mode === "light" ? palette.grey[700] : palette.common.white}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {t("actions.menu-options.edit")}
                    </Typography>
                  }
                />
              </ListItem>
              <MuiDivider variant="fullWidth" component="li" />
              <ListItem onClick={handleDelete} sx={{ py: 1 }} button>
                <ListItemIcon
                  sx={(theme) => ({
                    minWidth: theme.spacing(4.5),
                  })}
                >
                  <TrashIcon
                    size={20}
                    color={palette.mode === "light" ? palette.grey[700] : palette.common.white}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {t("actions.menu-options.delete")}
                    </Typography>
                  }
                />
              </ListItem>
              <MuiDivider variant="fullWidth" component="li" />
              <ListItem onClick={handleViewMore} sx={{ py: 1 }} button>
                <ListItemIcon
                  sx={(theme) => ({
                    minWidth: theme.spacing(4.5),
                  })}
                >
                  <ViewMoreIcon
                    size={20}
                    color={palette.mode === "light" ? palette.grey[700] : palette.common.white}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {t("actions.menu-options.viewmore")}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Popover>
        </>
      }
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
  );
};

export default TransactionItem;
