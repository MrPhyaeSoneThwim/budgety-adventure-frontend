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
import { MoreHorizRounded } from "@mui/icons-material";
import { categoryIcons } from "../../../utils/constants";
import { useTheme, alpha, styled } from "@mui/material/styles";
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

const CategoryItem = ({
  onEdit,
  onDelete,
  onViewMore,
  category: { _id, type, name, icon, iconColor },
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

  const renderIcon = (iconName) => {
    const categoryIcon = _.find(categoryIcons, (category) => category.name === iconName);
    if (categoryIcon) {
      return <categoryIcon.icon size={20} color={palette.common.white} />;
    }
    return null;
  };

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
        <Avatar sx={{ backgroundColor: iconColor }}>{icon && renderIcon(icon)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        secondary={
          <Typography
            sx={{ textTransform: "capitalize" }}
            color={type === "income" ? "primary" : "error"}
          >
            {t(`statistic.${type}`)}
          </Typography>
        }
        primary={<Typography sx={{ fontWeight: 500 }}>{name}</Typography>}
      />
    </ListItemStyle>
  );
};

export default CategoryItem;
