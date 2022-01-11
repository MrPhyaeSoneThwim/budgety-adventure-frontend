import React, { useState } from "react";
import {
  Box,
  List,
  Hidden,
  Popover,
  Tooltip,
  Divider,
  ListItem,
  IconButton,
  Typography,
  ListItemText,
  CircularProgress,
  ListItemSecondaryAction,
} from "@mui/material";

import Confirm from "../../../shared/confirm";
import ScrollBar from "../../../shared/scrollBar";
import CategoryAdd from "../components/categoryAdd";
import CategoryItem from "../components/categoryItem";
import CategoryEdit from "../components/categoryEdit";
import CategoryDetail from "../components/categoryDetail";
import no_content from "../../../assets/images/no_content.png";

import { useTranslation } from "react-i18next";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleRounded } from "@mui/icons-material";
import { AddIcon, FilterIcon } from "../../../assets/icons";
import { styled, useTheme, alpha } from "@mui/material/styles";
import {
  resetError,
  resetSuccess,
  getCategories,
  deleteCategory,
} from "../../../store/actions/categoryActions";

const ErrorImg = styled("img")({
  width: "16rem",
});

const Wrapper = styled(Box)(({ theme: { palette } }) => ({
  width: "20rem",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  borderLeft: `1px solid ${
    palette.mode === "light" ? palette.grey[300] : alpha(palette.common.white, 0.12)
  }`,
}));

const Header = styled(Box)(({ theme: { spacing, breakpoints } }) => ({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  paddingTop: spacing(1.5),
  paddingBottom: spacing(1.5),
  paddingLeft: spacing(3),
  paddingRight: spacing(3),
  justifyContent: "space-between",
  [breakpoints.down("sm")]: {
    paddingLeft: spacing(2.5),
    paddingRight: spacing(2.5),
  },
}));

const Categories = () => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { getAllLoading, getAllError, categories, error, success, loading } = useSelector(
    (state) => state.categoryState
  );

  const [addOpen, setAddOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [detailId, setDetailId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

  const [query, setQuery] = useState({
    type: "all",
  });

  useEffect(() => {
    if (deleteId && success) {
      setDeleteId(null);
      dispatch(resetSuccess());
    }
  }, [deleteId, success, dispatch]);

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

  return (
    <Hidden mdDown>
      <Wrapper>
        <Header>
          <Typography sx={{ fontWeight: 600 }} variant="h6">
            {t("statistic.categories")}
          </Typography>
          <Box sx={{ display: "inline-flex", alignItems: "center" }}>
            <Tooltip title={t("statistic.add")}>
              <IconButton onClick={handleAddOpen}>
                <AddIcon
                  size={20}
                  color={palette.mode === "light" ? palette.grey[700] : palette.common.white}
                />
              </IconButton>
            </Tooltip>
            <CategoryAdd open={addOpen} onClose={handleAddClose} />

            <Tooltip title={t("statistic.filter")}>
              <IconButton onClick={handleFilterOpen}>
                <FilterIcon
                  size={20}
                  color={palette.mode === "light" ? palette.grey[700] : palette.common.white}
                />
              </IconButton>
            </Tooltip>
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
                      <ListItem
                        button
                        key={index}
                        sx={{ py: 0.5 }}
                        onClick={() => handleSelect(option)}
                      >
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
        </Header>
        <ScrollBar
          sx={{
            px: 2,
            pb: 2,
            flex: 1,
            display: "flex",
            overflowY: "auto",
            flexDirection: "column",
          }}
        >
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
              categories.map((category) => {
                return (
                  <CategoryItem
                    key={category._id}
                    category={category}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onViewMore={handleDetail}
                  />
                );
              }))}
        </ScrollBar>

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
        <CategoryEdit editId={editId} onClose={handleEditClose} />
        <CategoryDetail detailId={detailId} onClose={handleDetailClose} />
      </Wrapper>
    </Hidden>
  );
};

export default Categories;
