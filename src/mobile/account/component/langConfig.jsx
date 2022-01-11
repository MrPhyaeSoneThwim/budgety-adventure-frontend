import React from "react";
import { useTranslation } from "react-i18next";
import {
  Radio,
  Drawer,
  RadioGroup,
  DialogTitle,
  DialogContent,
  FormControlLabel,
} from "@mui/material";

const LangConfig = ({ open, lang, handleSelect, onClose }) => {
  const { t } = useTranslation();

  const handleLang = (event) => {
    handleSelect(event);
    onClose();
  };

  return (
    <Drawer open={open} anchor="bottom" onClose={onClose}>
      <DialogTitle>{t("account.lang")}</DialogTitle>
      <DialogContent>
        <RadioGroup name="lang" value={lang} onChange={handleLang}>
          <FormControlLabel
            value="en"
            label={t("account.en")}
            control={<Radio color="primary" />}
          />
          <FormControlLabel
            value="mm"
            label={t("account.mm")}
            control={<Radio color="primary" />}
          />
        </RadioGroup>
      </DialogContent>
    </Drawer>
  );
};

export default LangConfig;
