import React from "react";

import Confirm from "../../../shared/confirm";
import ScrollBar from "../../../shared/scrollBar";
import WalletAdd from "../components/walletAdd";
import WalletItem from "../components/walletItem";
import WalletEdit from "../components/walletEdit";
import WalletDetail from "../components/walletDetail";
import no_content from "../../../assets/images/no_content.png";

import {
  getWallets,
  resetError,
  resetSuccess,
  deleteWallet,
  getWalletStat,
  resetWalletStat,
} from "../../../store/actions/walletActions";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AddIcon } from "../../../assets/icons";
import { useSelector, useDispatch } from "react-redux";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { Box, Hidden, Typography, IconButton, Tooltip, CircularProgress } from "@mui/material";

const ErrorImg = styled("img")({
  width: "16rem",
});

const Wrapper = styled(Box)(({ theme: { breakpoints } }) => ({
  display: "flex",
  width: "20rem",
  height: "100vh",
  flexDirection: "column",
  [breakpoints.down("md")]: {
    width: "100%",
  },
}));

const Header = styled(Box)(({ theme: { spacing, palette, zIndex } }) => ({
  flexShrink: 0,
  position: "sticky",
  top: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  zIndex: zIndex.appBar,
  paddingLeft: spacing(3),
  paddingRight: spacing(3),
  paddingTop: spacing(2),
  paddingBottom: spacing(2),
  backdropFilter: "blur(6px)",
  backgroundColor: alpha(palette.background.default, 0.8),
}));

const WalletList = () => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { wallets, success, walletsError, walletsLoading, error, loading } = useSelector(
    (state) => state.walletState
  );

  const [addOpen, setAddOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [detailId, setDetailId] = useState(null);

  useEffect(() => {
    if (selected) {
      dispatch(getWalletStat(selected));
    } else {
      dispatch(resetWalletStat());
    }
  }, [selected, dispatch]);

  useEffect(() => {
    dispatch(getWallets());
  }, [dispatch]);

  useEffect(() => {
    if (deleteId && success) {
      setDeleteId(null);
      dispatch(resetSuccess());
    }
    if (deleteId === selected && success) {
      setSelected(null);
    }
  }, [deleteId, success, selected, dispatch]);

  const handleSelect = (wallet) => {
    setSelected(wallet);
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
    dispatch(deleteWallet(deleteId));
  };

  const onClearError = () => {
    dispatch(resetError());
  };

  return (
    <Wrapper>
      <Hidden mdDown>
        <Header>
          <Typography sx={{ fontWeight: 600 }} variant="h6">
            {t("wallets.title")}
          </Typography>
          <Tooltip title={t("wallets.add")}>
            <IconButton onClick={handleAddOpen}>
              <AddIcon
                size={20}
                color={palette.mode === "light" ? palette.grey[700] : palette.common.white}
              />
            </IconButton>
          </Tooltip>
          <WalletAdd open={addOpen} onClose={handleAddClose} />
        </Header>
      </Hidden>
      <ScrollBar
        sx={{ px: 2, flex: 1, display: "flex", flexDirection: "column", overflowY: "auto", pb: 2 }}
      >
        {(walletsLoading && (
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
          (walletsError && (
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
                {walletsError}
              </Typography>
            </Box>
          )) ||
          (wallets.length > 0 &&
            wallets.map((wallet) => {
              return (
                <WalletItem
                  wallet={wallet}
                  key={wallet._id}
                  selected={selected}
                  onEdit={handleEdit}
                  onSelect={handleSelect}
                  onDelete={handleDelete}
                  onViewMore={handleDetail}
                />
              );
            })) || (
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
                No wallets information
              </Typography>
            </Box>
          )}
      </ScrollBar>
      <Confirm
        error={error}
        open={!!deleteId}
        loading={loading}
        onClearError={onClearError}
        onClose={handleDeleteClose}
        onSubmit={handleConfirmDelete}
        title={t("wallets.wallet-delete.title")}
        description={t("wallets.wallet-delete.desc")}
      />
      <WalletEdit editId={editId} onClose={handleEditClose} />
      <WalletDetail detailId={detailId} onClose={handleDetailClose} />
    </Wrapper>
  );
};

export default WalletList;
