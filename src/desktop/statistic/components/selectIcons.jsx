import React from "react";
import ScrollBar from "../../../shared/scrollBar";
import SelectIcon from "../../../shared/selectIcon";

import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { categoryIcons } from "../../../utils/constants";
import { Dialog, DialogTitle, DialogContent, Grid, DialogActions, Button } from "@mui/material";

const SelectIcons = ({ icon, iconColor, open, onClose, onSelect }) => {
  const { t } = useTranslation();
  const { spacing } = useTheme();

  const handleIconChange = (name, value) => {
    onSelect(name, value);
    onClose();
  };
  return (
    <Dialog fullWidth open={open} maxWidth="xs" onClose={onClose}>
      <DialogTitle>{t("statistic.select-icon")}</DialogTitle>
      <DialogContent>
        <ScrollBar sx={{ maxHeight: spacing(20), overflowY: "auto", mx: -1 }}>
          <Grid container>
            {categoryIcons.map((categoryIcon) => {
              return (
                <Grid key={categoryIcon.name} item xs={2}>
                  <SelectIcon
                    name="icon"
                    selected={icon}
                    iconType="category"
                    key={categoryIcon.name}
                    iconBackground={iconColor}
                    value={categoryIcon.name}
                    onChange={handleIconChange}
                    icon={categoryIcon.name}
                  />
                </Grid>
              );
            })}
          </Grid>
        </ScrollBar>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          {t("actions.dismiss")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectIcons;
