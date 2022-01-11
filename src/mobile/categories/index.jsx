import React from "react";

import {
  Box,
  List,
  Divider,
  Popover,
  ListItem,
  IconButton,
  Typography,
  ListItemText,
  useMediaQuery,
  CircularProgress,
  ListItemSecondaryAction,
} from "@mui/material";

import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { AddIcon, FilterIcon } from "../../assets/icons";
import { CheckCircleRounded } from "@mui/icons-material";
import { useState, useCallback, useEffect } from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import {
  resetError,
  resetSuccess,
  getCategories,
  deleteCategory,
} from "../../store/actions/categoryActions";

import Helmet from "../../common/helmet";
import Confirm from "../../shared/confirm";
import BackAppBar from "../../common/backAppBar";
import CategoryAdd from "./components/categoryAdd";
import CategoryEdit from "./components/categoryEdit";
import CategoryItem from "./components/categoryItem";
import CategoryDetail from "./components/categoryDetail";
import no_content from "../../assets/images/no_content.png";

const ErrorImg = styled("img")(({ theme: { breakpoints } }) => ({
  width: "22rem",
  [breakpoints.down("sm")]: {
    width: "16rem",
  },
}));

const Categories = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { palette, breakpoints } = useTheme();
  const isMdUp = useMediaQuery(breakpoints.up("md"));
  const { categories, getAllLoading, success, error, loading, getAllError } = useSelector(
    (state) => state.categoryState
  );

  const [editId, setEditId] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

  const [query, setQuery] = useState({
    type: "all",
  });

  const onFilterCategory = useCallback(() => {
    let filterQuery = {};
    if (query.type !== "all") {
      filterQuery.type = query.type;
    }
    dispatch(getCategories(filterQuery));
  }, [dispatch, query]);

  useEffect(() => {
    onFilterCategory();
  }, [dispatch, query, onFilterCategory]);

  useEffect(() => {
    if (success) {
      onFilterCategory();
    }
  }, [success, onFilterCategory]);

  useEffect(() => {
    if (deleteId && success) {
      setDeleteId(null);
      dispatch(resetSuccess());
    }
  }, [deleteId, success, dispatch]);

  const handleSelect = (option) => {
    setQuery({ ...query, type: option });
    setFilterAnchorEl(null);
  };

  const handleFilterOpen = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  // callbacks for transaction item edit action
  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleEditClose = () => {
    setEditId(null);
  };

  // callbacks for transaction item view more action
  const handleDetail = (id) => {
    setDetailId(id);
  };

  const handleDetailClose = () => {
    setDetailId(null);
  };

  // callbacks for transaction item delete action
  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const handleDeleteClose = () => {
    setDeleteId(null);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteCategory(deleteId));
  };

  const onClearError = () => {
    dispatch(resetError());
  };

  if (isMdUp) {
    return <Navigate to="/statistic" />;
  }

  return (
    <>
      <Helmet title="Categories" />
      <BackAppBar
        path="/mobile-account"
        title={t("statistic.categories")}
        action={
          <Box sx={{ display: "inline-flex", alignItems: "center" }}>
            <IconButton onClick={handleAddOpen}>
              <AddIcon
                size={24}
                color={palette.mode === "light" ? palette.grey[700] : palette.common.white}
              />
            </IconButton>
            <CategoryAdd open={addOpen} onClose={handleAddClose} />

            <IconButton onClick={handleFilterOpen}>
              <FilterIcon
                size={24}
                color={palette.mode === "light" ? palette.grey[700] : palette.common.white}
              />
            </IconButton>
            <Popover
              disableRestoreFocus
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={handleFilterClose}
            >
              <List sx={{ py: 0 }}>
                {["all", "income", "expense"].map((option, index) => {
                  return (
                    <Box key={index}>
                      <ListItem button sx={{ py: 0.5 }} onClick={() => handleSelect(option)}>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body1"
                              sx={{ textTransform: "capitalize", mr: 4, fontWeight: 500 }}
                            >
                              {t(`actions.filter-options.${option}`)}
                            </Typography>
                          }
                        />
                        <ListItemSecondaryAction>
                          <CheckCircleRounded
                            fontSize="small"
                            sx={{
                              mb: -0.5,
                              color: "primary.main",
                              visibility: option === query.type ? "visible" : "hidden",
                            }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index !== 2 && (
                        <Divider
                          variant="fullWidth"
                          sx={(theme) => ({
                            borderColor:
                              theme.palette.mode === "light"
                                ? theme.palette.grey[200]
                                : alpha(theme.palette.common.white, 0.12),
                          })}
                        />
                      )}
                    </Box>
                  );
                })}
              </List>
            </Popover>
          </Box>
        }
      />
      <Box sx={{ px: 2, pb: 2 }}>
        {(getAllLoading && (
          <Box
            sx={{
              py: 10,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        )) ||
          (getAllError && (
            <Box
              sx={{
                py: 4,
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <ErrorImg src={no_content} alt="empty content" />
              <Typography sx={{ fontSize: "1.05rem", fontWeight: 500, mt: -2 }}>
                {getAllError}
              </Typography>
            </Box>
          )) ||
          (categories.length > 0 &&
            categories.map((category) => (
              <CategoryItem
                key={category._id}
                category={category}
                onEdit={handleEdit}
                onViewMore={handleDetail}
                onDelete={handleDelete}
              />
            )))}
      </Box>
      <CategoryEdit editId={editId} onClose={handleEditClose} />
      <CategoryDetail detailId={detailId} onClose={handleDetailClose} />
      <Confirm
        error={error}
        open={!!deleteId}
        loading={loading}
        onClearError={onClearError}
        onClose={handleDeleteClose}
        onSubmit={handleConfirmDelete}
        title={t("statistic.category-delete.title")}
        description={t("statistic.category-delete.desc")}
      />
    </>
  );
};

export default Categories;
