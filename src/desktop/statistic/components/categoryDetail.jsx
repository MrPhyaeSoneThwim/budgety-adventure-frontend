import {
  Box,
  Chip,
  Divider,
  Dialog,
  Button,
  Typography,
  DialogActions,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useTheme, styled } from "@mui/material/styles";
import { getCategory } from "../../../store/actions/categoryActions";

import _ from "lodash";
import React from "react";
import { categoryIcons } from "../../../utils/constants";
import no_content from "../../../assets/images/no_content.png";

const ErrorImg = styled("img")({
  width: "16rem",
});

const CategoryDetail = ({ detailId, onClose }) => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { category, getLoading, getError } = useSelector((state) => state.categoryState);

  useEffect(() => {
    if (detailId) {
      dispatch(getCategory(detailId));
    }
  }, [dispatch, detailId]);

  const renderIcon = (icon) => {
    const Icon = _.find(categoryIcons, (categoryIcon) => categoryIcon.name === icon).icon;
    return <Icon size={24} color={palette.common.white} />;
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={!!detailId} onClose={onClose}>
      <DialogContent>
        {(getLoading && (
          <Box sx={{ py: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress color="primary" />
          </Box>
        )) ||
          (getError && (
            <Box
              sx={{
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
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: palette.common.white,
                    backgroundColor: category.iconColor,
                  }}
                >
                  {renderIcon(category.icon)}
                </Box>
                <Typography sx={{ fontWeight: 600 }} variant="h6">
                  {category.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: 1,
                  py: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="subtitle1">{t("statistic.type")}</Typography>
                <Chip
                  sx={{
                    textTransform: "capitalize",
                    color: palette.common.white,
                    backgroundColor:
                      category.type === "income" ? palette.primary.main : palette.error.main,
                  }}
                  label={t(`dashboard.${category.type}`)}
                />
              </Box>

              <Divider />
              <Box
                sx={{
                  py: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="subtitle1">{t("statistic.amount")}</Typography>
                <Typography>{`${
                  category.amount ? category.amount.toLocaleString() : "0.00"
                }`}</Typography>
              </Box>
            </>
          ))}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          {t("actions.dismiss")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryDetail;
