import {
  Box,
  List,
  Hidden,
  Divider,
  ListItem,
  Tooltip,
  Popover,
  IconButton,
  Typography,
  ListItemText,
  CircularProgress,
  ListItemSecondaryAction,
} from "@mui/material";

import { CalendarPicker } from "@mui/lab";
import { getWeeksInMonth } from "date-fns";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { alpha, useTheme } from "@mui/material/styles";
import { CheckCircleRounded } from "@mui/icons-material";
import { useState, useEffect, useCallback } from "react";
import { AddIcon, FilterIcon } from "../../../assets/icons";
import {
  resetError,
  resetSuccess,
  getTransactions,
  deleteTransaction,
} from "../../../store/actions/transActions";

import React from "react";
import moment from "moment";
import Confirm from "../../../shared/confirm";
import Scrollbar from "../../../shared/scrollBar";
import TransactionAdd from "../components/transactionAdd";
import TransactionEdit from "../components/transactionEdit";
import TransactionDetail from "../components/transactionDetail";
import TransactionItem from "../components/transactionItem";
import no_content from "../../../assets/images/no_content.png";

const LIST_ITEM_HEIGHT = 64;
const LIST_ITEM_GUTTER = 8;

const ErrorImg = styled("img")({
  width: "16rem",
});

const Wrapper = styled(Box)(({ theme: { palette } }) => ({
  width: "20rem",
  height: "100vh",
  borderLeft: `1px solid ${
    palette.mode === "light" ? palette.grey[300] : alpha(palette.common.white, 0.12)
  }`,
}));

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
  const { palette } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { transactions, getTransLoading, getTransError, success, loading, error } = useSelector(
    (state) => state.transState
  );

  const [editId, setEditId] = useState(null);
  const [detailId, setDetailId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [addOpen, setAddOpen] = useState(false);
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

  // to handle gutter between calendar and content by
  // the number of weeks in the specific date
  useEffect(() => {
    const weekCount = getWeeksInMonth(query.createdAt);
    setEnableGutter(weekCount > 5 ? false : true);
  }, [query.createdAt]);

  const handleGutter = (date) => {
    const weekCount = getWeeksInMonth(date);
    setEnableGutter(weekCount > 5 ? false : true);
  };

  const handleDate = (date) => {
    setQuery({ ...query, createdAt: date });
  };

  const handleSelect = (option) => {
    setQuery({ ...query, status: option });
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
    dispatch(deleteTransaction(deleteId));
  };

  const onClearError = () => {
    dispatch(resetError());
  };

  return (
    <Hidden mdDown>
      <Wrapper>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Box sx={{ flexShrink: 0, position: "sticky", top: 0 }}>
            <CalendarPicker
              views={["day"]}
              date={query.createdAt}
              onChange={handleDate}
              onMonthChange={handleGutter}
              showDaysOutsideCurrentMonth
            />
            <Header sx={{ mt: enableGutter ? -10 : -5 }}>
              <Typography sx={{ fontSize: "1rem", fontWeight: 600 }} variant="h6">
                {t(`dashboard.transactions`)}
              </Typography>
              <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                <Tooltip title={t("dashboard.add")}>
                  <IconButton onClick={handleAddOpen} size="small">
                    <AddIcon
                      size={20}
                      color={palette.mode === "light" ? palette.grey[700] : palette.common.white}
                    />
                  </IconButton>
                </Tooltip>

                <TransactionAdd
                  open={addOpen}
                  onClose={handleAddClose}
                  createdAt={query.createdAt}
                />

                <Tooltip title={t("dashboard.filter")}>
                  <IconButton onClick={handleFilterOpen} size="small">
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
          <Box sx={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
            <Scrollbar
              sx={{
                px: 1.5,
                maxHeight: LIST_ITEM_GUTTER * 2 + LIST_ITEM_HEIGHT * (enableGutter ? 6 : 5.5),
              }}
            >
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
                    <Typography
                      sx={{ fontSize: "1.05rem", textAlign: "center", fontWeight: 500, mt: -2 }}
                    >
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
            </Scrollbar>
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
      </Wrapper>
    </Hidden>
  );
};

export default Transactions;
