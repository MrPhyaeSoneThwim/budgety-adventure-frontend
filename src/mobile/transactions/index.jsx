import {
  Box,
  List,
  Popover,
  Divider,
  ListItem,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  useMediaQuery,
  CircularProgress,
  ListItemSecondaryAction,
} from "@mui/material";

import { CalendarPicker } from "@mui/lab";
import { Navigate } from "react-router-dom";
import { getWeeksInMonth } from "date-fns";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { AddIcon, FilterIcon } from "../../assets/icons";
import { CheckCircleRounded } from "@mui/icons-material";
import { useState, useEffect, useCallback } from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import {
  resetError,
  resetSuccess,
  getTransactions,
  deleteTransaction,
} from "../../store/actions/transActions";

import React from "react";
import moment from "moment";
import Helmet from "../../common/helmet";
import Confirm from "../../shared/confirm";
import BottomNav from "../../common/bottomNav";
import TransactionAdd from "./components/transactionAdd";
import TransactionItem from "./components/transactionItem";
import TransactionEdit from "./components/transactionEdit";
import no_content from "../../assets/images/no_content.png";
import TransactionDetail from "./components/transactionDetail";

const ErrorImg = styled("img")({
  width: "16rem",
});

const Header = styled(Box)(({ theme: { spacing, breakpoints } }) => ({
  display: "flex",
  alignItems: "center",
  paddingTop: spacing(1.5),
  paddingBottom: spacing(0.5),
  paddingLeft: spacing(3),
  paddingRight: spacing(3),
  justifyContent: "space-between",
  [breakpoints.down("sm")]: {
    paddingLeft: spacing(2.5),
    paddingRight: spacing(2.5),
  },
}));

const Transactions = () => {
  const { t } = useTranslation();
  const { palette, breakpoints } = useTheme();

  const dispatch = useDispatch();

  const { transactions, getTransLoading, getTransError, error, success, loading } = useSelector(
    (state) => state.transState
  );

  const isMdUp = useMediaQuery(breakpoints.up("md"));

  const [addOpen, setAddOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [detailId, setDetailId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [enableGutter, setEnableGutter] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

  const [query, setQuery] = useState({
    createdAt: new Date(),
    status: "all",
  });

  const fetchTransactions = useCallback(() => {
    const filter = {};
    const { createdAt, status } = query;
    // set up query state as filtered query
    filter.createdAt = moment(createdAt).format("YYYY-MM-DD");
    if (status !== "all") {
      filter.status = status;
    }
    dispatch(getTransactions(filter));
  }, [dispatch, query]);

  useEffect(() => {
    fetchTransactions();
  }, [query.status, query.createdAt, fetchTransactions]);

  // fetch transactions if the operations is succeed
  useEffect(() => {
    if (success) {
      fetchTransactions();
    }
  }, [success, fetchTransactions]);

  useEffect(() => {
    if (deleteId && success) {
      setDeleteId(null);
      dispatch(resetSuccess());
    }
  }, [deleteId, success, dispatch]);

  const handleDate = (date) => {
    setQuery({ ...query, createdAt: date });
  };

  const handleSelect = (option) => {
    setQuery({ ...query, status: option });
    setFilterAnchorEl(null);
  };

  useEffect(() => {
    const weekCount = getWeeksInMonth(query.createdAt);
    setEnableGutter(weekCount > 5 ? false : true);
  }, [query.createdAt]);

  const handleGutter = (date) => {
    const weekCount = getWeeksInMonth(date);
    setEnableGutter(weekCount > 5 ? false : true);
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
    dispatch(deleteTransaction(deleteId));
  };

  const onClearError = () => {
    dispatch(resetError());
  };

  if (isMdUp) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Helmet title="Transactions" />
      <Box sx={{ pb: 8 }}>
        <Box
          sx={(theme) => ({
            top: 0,
            flexShrink: 0,
            position: "sticky",
            bgcolor: "background.default",
            zIndex: theme.zIndex.appBar,
          })}
        >
          <CalendarPicker
            views={["day"]}
            date={query.createdAt}
            onChange={handleDate}
            onMonthChange={handleGutter}
            showDaysOutsideCurrentMonth
          />
          <Header sx={{ mt: enableGutter ? -10 : -5 }}>
            <Typography sx={{ fontSize: "1.125rem", fontWeight: 500 }} variant="h6">
              {t("dashboard.transactions")}
            </Typography>
            <Box sx={{ display: "inline-flex", alignItems: "center" }}>
              <IconButton onClick={handleAddOpen}>
                <AddIcon
                  size={24}
                  color={palette.mode === "light" ? palette.grey[700] : palette.common.white}
                />
              </IconButton>
              <TransactionAdd open={addOpen} onClose={handleAddClose} />
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
                  <ListSubheader sx={{ lineHeight: "1.25rem", pb: 1, pt: 1 }}>
                    {t("dashboard.transaction-detail.status")}
                  </ListSubheader>
                  <Divider
                    variant="fullWidth"
                    sx={(theme) => ({
                      borderColor:
                        theme.palette.mode === "light"
                          ? theme.palette.grey[200]
                          : alpha(theme.palette.common.white, 0.12),
                    })}
                  />
                  {["all", "income", "expense"].map((option, index) => {
                    return (
                      <Box key={index}>
                        <ListItem onClick={() => handleSelect(option)} sx={{ py: 0.5 }} button>
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
                                mr: -1,
                                fontSize: "1.5rem",
                                color: "primary.main",
                                visibility: option === query.status ? "visible" : "hidden",
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
        </Box>
        <Box sx={{ px: 2 }}>
          {(getTransLoading && (
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
            (getTransError && (
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
                  {getTransError}
                </Typography>
              </Box>
            )) ||
            (transactions.length > 0 && (
              <List>
                {transactions.map((transaction, index) => {
                  return (
                    <TransactionItem
                      key={index}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onViewMore={handleDetail}
                      transaction={transaction}
                    />
                  );
                })}
              </List>
            ))}
        </Box>
        <TransactionEdit editId={editId} onClose={handleEditClose} />
        <TransactionDetail detailId={detailId} onClose={handleDetailClose} />
        <Confirm
          error={error}
          open={!!deleteId}
          loading={loading}
          onClearError={onClearError}
          onClose={handleDeleteClose}
          onSubmit={handleConfirmDelete}
          title={t("dashboard.transaction-delete.title")}
          description={t("dashboard.transaction-delete.desc")}
        />
      </Box>
      <BottomNav />
    </>
  );
};

export default Transactions;
