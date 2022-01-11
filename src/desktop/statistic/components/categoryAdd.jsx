import {
  Box,
  Alert,
  Dialog,
  Button,
  TextField,
  Typography,
  ButtonBase,
  AlertTitle,
  DialogTitle,
  DialogActions,
  DialogContent,
  CircularProgress,
} from "@mui/material";

import { useState } from "react";
import { Formik, Field, Form } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useTheme, styled, alpha } from "@mui/material";
import { categorySchema } from "../../../utils/validations";
import { COLOR_OPTIONS, categoryIcons } from "../../../utils/constants";
import { addCategory, resetError, resetSuccess } from "../../../store/actions/categoryActions";

import _ from "lodash";
import React from "react";
import SelectIcons from "./selectIcons";
import TabButton from "../../../shared/tabButton";
import ColorPicker from "../../../shared/colorPicker";

const IconPicker = styled(ButtonBase)(({ theme: { palette, spacing } }) => ({
  width: "100%",
  display: "flex",
  cursor: "pointer",
  padding: `8px 12px`,
  alignItems: "center",
  borderRadius: spacing(1.5),
  justifyContent: "space-between",
  backgroundColor: palette.mode === "light" ? palette.grey[100] : palette.grey[800],
  border: `1px solid ${palette.mode === "light" ? palette.grey[100] : palette.grey[800]}`,
  "&:hover": {
    backgroundColor: palette.mode === "light" ? palette.grey[100] : palette.grey[800],
  },
}));

const LoadingWrapper = styled(Box)(({ theme: { palette, zIndex } }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: "absolute",
  display: "flex",
  alignItems: "center",
  zIndex: zIndex.drawer + 1,
  justifyContent: "center",
  backgroundColor: alpha(palette.mode === "light" ? palette.common.white : palette.grey[900], 0.75),
}));

const CategoryAdd = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector((state) => state.categoryState);

  const [selectOpen, setSelectOpen] = useState(false);

  const handleSelectOpen = () => {
    setSelectOpen(true);
  };

  const handleSelectClose = () => {
    setSelectOpen(false);
  };

  const handleClose = () => {
    dispatch(resetError());
    dispatch(resetSuccess());
    onClose();
  };

  const renderIcon = (icon) => {
    const Icon = _.find(categoryIcons, (categoryIcon) => categoryIcon.name === icon).icon;
    return <Icon size={18} color={palette.common.white} />;
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={loading ? () => {} : handleClose}>
      <Box sx={{ position: "relative" }}>
        <DialogTitle>{t("statistic.category-add.title")}</DialogTitle>
        <Formik
          validationSchema={categorySchema}
          initialValues={{
            name: "",
            type: "income",
            icon: categoryIcons[0].name,
            iconColor: COLOR_OPTIONS[0],
          }}
          onSubmit={(values) => {
            dispatch(addCategory(values));
          }}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form>
              <DialogContent sx={{ pt: 0 }}>
                <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                  <TabButton
                    name="type"
                    value="income"
                    label={t("statistic.income")}
                    activeValue={values.type}
                    onChange={(name, value) => setFieldValue(name, value)}
                  />
                  <TabButton
                    name="type"
                    value="expense"
                    label={t("statistic.expense")}
                    activeValue={values.type}
                    onChange={(name, value) => setFieldValue(name, value)}
                  />
                </Box>
                <Box mt={2}>
                  <Field
                    fullWidth
                    name="name"
                    as={TextField}
                    variant="outlined"
                    autoComplete="off"
                    label={t("statistic.name")}
                    helperText={touched.name && errors.name}
                    error={Boolean(errors.name && touched.name)}
                  />
                </Box>
                <Box my={1}>
                  <Typography sx={{ fontWeight: 600 }} variant="subtitle2">
                    {t("statistic.select-color")}
                  </Typography>
                  <ColorPicker
                    name="iconColor"
                    colors={COLOR_OPTIONS}
                    onChange={(event) => {
                      const { name, value } = event.target;
                      setFieldValue(name, value);
                    }}
                    selected={values.iconColor}
                    sx={{ flexDirection: "row", justifyContent: "space-around", mx: -0.5 }}
                  />
                </Box>
                <IconPicker onClick={handleSelectOpen} my={1}>
                  <Typography sx={{ fontWeight: 600 }} variant="subtitle2">
                    {t("statistic.select-icon")}
                  </Typography>
                  <Box
                    sx={{
                      p: 0.85,
                      alignItems: "center",
                      borderRadius: "50%",
                      display: "inline-flex",
                      justifyContent: "center",
                      backgroundColor: values.iconColor,
                    }}
                  >
                    {renderIcon(values.icon)}
                  </Box>
                </IconPicker>
                <SelectIcons
                  open={selectOpen}
                  icon={values.icon}
                  onSelect={(name, value) => {
                    setFieldValue(name, value);
                    handleSelectClose();
                  }}
                  onClose={handleSelectClose}
                  iconColor={values.iconColor}
                />

                {error && (
                  <Box sx={{ mt: 1.5 }}>
                    <Alert onClose={() => dispatch(resetError())} severity="error">
                      <AlertTitle>Error</AlertTitle>
                      {error}
                    </Alert>
                  </Box>
                )}
                {success && (
                  <Box sx={{ mt: 1.5 }}>
                    <Alert onClose={() => dispatch(resetSuccess())} severity="success">
                      <AlertTitle>Success</AlertTitle>
                      {success}
                    </Alert>
                  </Box>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>{t("actions.dismiss")}</Button>
                <Button type="submit" color="primary">
                  {t("actions.submit")}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>

        {loading && (
          <LoadingWrapper>
            <CircularProgress color="primary" />
          </LoadingWrapper>
        )}
      </Box>
    </Dialog>
  );
};

export default CategoryAdd;
