import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Hidden,
  Tooltip,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink as RouterLink } from "react-router-dom";
import { alpha, useTheme, styled } from "@mui/material/styles";

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(
  ({ theme: { breakpoints, palette, spacing, typography } }) => ({
    ...typography.body2,
    height: spacing(6),
    position: "relative",
    textTransform: "capitalize",
    color: palette.text.secondary,
    borderTopLeftRadius: spacing(6),
    borderBottomLeftRadius: spacing(6),
    marginBottom: spacing(0.5),
    [breakpoints.down("lg")]: {
      padding: 0,
      borderRadius: 12,
      display: "flex",
      width: spacing(6),
      alignItems: "center",
      justifyContent: "center",
    },
    "&:before": {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      display: "none",
      position: "absolute",
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      [breakpoints.down("lg")]: {
        width: 0,
      },
      backgroundColor: palette.primary.main,
    },
  })
);

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const LinkItemTextStyle = styled(ListItemText)({
  fontWeight: 600,
});

const SideLink = ({ item, active, type, ...props }) => {
  const { t } = useTranslation();
  const { palette, breakpoints } = useTheme();
  const isLgDown = useMediaQuery(breakpoints.down("lg"));

  const { title, path, icon, activeIcon } = item;
  if (item.path && type === "link") {
    const isActiveRoot = active(item.path);

    const activeRootStyle = {
      color: "primary.main",
      fontWeight: "fontWeightMedium",
      bgcolor: alpha(palette.primary.main, palette.action.selectedOpacity),
      "&:hover": {
        backgroundColor: alpha(palette.primary.main, palette.action.selectedOpacity),
      },
      "&:before": { display: "block" },
    };

    const LinkListItem = () => {
      return (
        <ListItemStyle
          to={path}
          component={RouterLink}
          sx={{ ...(isActiveRoot && activeRootStyle) }}
        >
          <ListItemIconStyle>{isActiveRoot ? activeIcon : icon}</ListItemIconStyle>
          <Hidden lgDown>
            <LinkItemTextStyle disableTypography primary={t(`sideNav.${title}`)} />
          </Hidden>
        </ListItemStyle>
      );
    };

    return isLgDown ? (
      <Tooltip title={title} placement="right">
        <Box>
          <LinkListItem />
        </Box>
      </Tooltip>
    ) : (
      <LinkListItem />
    );
  }

  const ButtonListItem = () => {
    return (
      <ListItemStyle {...props}>
        <ListItemIconStyle>{icon}</ListItemIconStyle>
        <Hidden lgDown>
          <LinkItemTextStyle disableTypography primary={title} />
        </Hidden>
      </ListItemStyle>
    );
  };

  return isLgDown ? (
    <Tooltip title={title} placement="right">
      <Box>
        <ButtonListItem />
      </Box>
    </Tooltip>
  ) : (
    <ButtonListItem />
  );
};

SideLink.defaultProps = {
  type: "button",
};

SideLink.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
  type: PropTypes.string.isRequired,
};

export default SideLink;
