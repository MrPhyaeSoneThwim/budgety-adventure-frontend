import {
  Box,
  Drawer,
  Button,
  Alert,
  AlertTitle,
  TextField,
  Typography,
  ButtonBase,
  DialogTitle,
  DialogActions,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { categorySchema } from "../../../utils/validations";
import { useTheme, styled, alpha } from "@mui/material/styles";
import { COLOR_OPTIONS, categoryIcons } from "../../../utils/constants";
import {
  resetError,
  getCategory,
  resetSuccess,
  updateCategory,
} from "../../../store/actions/categoryActions";

import _ from "lodash";
import React from "react";
import SelectIcons from "./selectIcons";
import TabButton from "../../../shared/tabButton";
import ColorPicker from "../../../shared/colorPicker";
import no_content from "../../../assets/images/no_content.png";

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
  justifyContent: "center",
  zIndex: zIndex.drawer + 1,
  backgroundColor: alpha(palette.mode === "light" ? palette.common.white : palette.grey[900], 0.75),
}));

const ErrorImg = styled("img")({
  width: "16rem",
});

const CategoryEdit = ({ editId, onClose }) => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const { category, getLoading, getError, loading, success, error } = useSelector(
    (state) => state.categoryState
  );

  const [selectOpen, setSelectOpen] = useState(false);

  useEffect(() => {
    if (editId) {
      dispatch(getCategory(editId));
    }
  }, [dispatch, editId]);

  const renderIcon = (icon) => {
    const Icon = _.find(categoryIcons, (categoryIcon) => categoryIcon.name === icon).icon;
    return <Icon size={18} color={palette.common.white} />;
  };

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

  return (
    <Drawer anchor="bottom" open={!!editId} onClose={loading ? () => {} : handleClose}>
      <Box sx={{ position: "relative" }}>
        <DialogTitle>{t("statistic.category-edit.title")}</DialogTitle>
        {(getLoading && (
          <Box sx={{ py: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress color="primary" />
          </Box>
        )) ||
          (getError && (
            <Box
              sx={{
                py: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ErrorImg src={no_content} alt="empty content" />
              <Typography sx={{ fontSize: "1.05rem", fontWeight: 500, mt: -2 }}>
                {getError}
              </Typography>
            </Box>
          )) ||
          (category && (
            <Formik
              validationSchema={categorySchema}
              initialValues={{
                name: category.name ? category.name : "",
                type: category.type ? category.type : "income",
                icon: category.icon ? category.icon : categoryIcons[0].name,
                iconColor: category.iconColor ? category.iconColor : COLOR_OPTIONS[0],
              }}
              onSubmit={(values) => {
                dispatch(updateCategory(category._id, values));
              }}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form>
                  <DialogContent sx={{ pt: 0 }}>
                    <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                      <TabButton
                        name="type"
                        value="income"
                        onChange={(name, value) => {
                          setFieldValue(name, value);
                        }}
                        activeValue={values.type}
                        label={t("statistic.income")}
                      />
                      <TabButton
                        name="type"
                        value="expense"
                        onChange={(name, value) => {
                          setFieldValue(name, value);
                        }}
                        activeValue={values.type}
                        label={t("statistic.expense")}
                      />
                    </Box>
                    <Box mt={2.5}>
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
                    <Box mt={1}>
                      <Typography sx={{ fontWeight: 600 }} variant="subtitle2">
                        Select Color
                      </Typography>
                      <Box mt={1}>
                        <ColorPicker
                          name="iconColor"
                          colors={COLOR_OPTIONS}
                          onChange={(event) => {
                            const { name, value } = event.target;
                            setFieldValue(name, value);
                          }}
                          selected={category.iconColor}
                          sx={{ flexDirection: "row", mx: -0.5 }}
                        />
                      </Box>
                    </Box>
                    <IconPicker onClick={handleSelectOpen} sx={{ mt: 1.5, mb: 1 }}>
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
          ))}

        {loading && (
          <LoadingWrapper>
            <CircularProgress color="primary" />
          </LoadingWrapper>
        )}
      </Box>
    </Drawer>
  );
};

export default CategoryEdit;
