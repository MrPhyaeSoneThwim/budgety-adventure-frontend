import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BottomNavigationAction } from "@mui/material";
const NavLink = ({ item, active, type, ...props }) => {
  const { t } = useTranslation();
  const isActiveRoot = active(item.path);

  const activeRootStyle = {
    color: "primary.main",
  };
  const rootStyle = {
    color: "text.primary",
    fontWeight: "fontWeightMedium",
  };

  return (
    <BottomNavigationAction
      {...props}
      to={item.path}
      component={Link}
      value={item.path}
      label={t(`bottomNav.${item.title}`)}
      icon={isActiveRoot ? item.activeIcon : item.icon}
      sx={{ ...rootStyle, ...(isActiveRoot && activeRootStyle) }}
    />
  );
};

export default NavLink;
