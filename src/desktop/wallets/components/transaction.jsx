import _ from "lodash";
import React from "react";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { categoryIcons } from "../../../utils/constants";
import { Avatar, ListItem, Typography, ListItemText, ListItemAvatar } from "@mui/material";

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
    status,
    amount,
    category: { icon, iconColor, name },
  },
}) => {
  const { palette } = useTheme();

  const Icon = _.find(categoryIcons, (category) => category.name === icon).icon;
  const transactionAmount =
    status === "income" ? `+${amount.toLocaleString()}` : `-${amount.toLocaleString()}`;

  return (
    <>
      <ListItemStyle>
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: iconColor }}>
            <Icon size={20} color={palette.common.white} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          secondary={transactionAmount}
          secondaryTypographyProps={{
            sx: { fontWeight: 500 },
            color: status === "income" ? "primary" : "error",
          }}
          primary={<Typography sx={{ fontWeight: 500 }}>{name}</Typography>}
        />
      </ListItemStyle>
    </>
  );
};

export default TransactionItem;
