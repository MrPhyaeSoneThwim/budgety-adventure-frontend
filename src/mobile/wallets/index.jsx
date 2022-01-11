import React, { useState } from "react";

import Helmet from "../../common/helmet";
import Confirm from "../../shared/confirm";
import WalletAdd from "./components/walletAdd";
import WalletEdit from "./components/walletEdit";
import WalletItem from "./components/walletItem";
import BackAppBar from "../../common/backAppBar";
import WalletDetail from "./components/walletDetail";
import no_content from "../../assets/images/no_content.png";

import { useEffect } from "react";
import { AddIcon } from "../../assets/icons";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useTheme, styled } from "@mui/material/styles";
import { IconButton, Box, Typography, CircularProgress } from "@mui/material";

import {
  getWallets,
  resetError,
  deleteWallet,
  resetSuccess,
} from "../../store/actions/walletActions";

const ErrorImg = styled("img")({
  width: "16rem",
});

const MobileWallets = () => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { wallets, walletsError, loading, error, success, walletsLoading } = useSelector(
    (state) => state.walletState
  );

  const [addOpen, setAddOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [detailId, setDetailId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(getWallets());
  }, [dispatch]);

  useEffect(() => {
    if (deleteId && success) {
      setDeleteId(null);
      dispatch(resetSuccess());
    }
  }, [deleteId, success, dispatch]);

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
    <>
      <Helmet title="Wallets" />
      <BackAppBar
        path="/mobile-account"
        title={t("wallets.title")}
        action={
          <>
            <IconButton onClick={handleAddOpen}>
              <AddIcon
                size={24}
                color={palette.mode === "light" ? palette.grey[700] : palette.common.white}
              />
            </IconButton>
            <WalletAdd open={addOpen} onClose={handleAddClose} />
          </>
        }
      />
      <Box sx={{ px: 2 }}>
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
            wallets.map((wallet) => (
              <WalletItem
                wallet={wallet}
                key={wallet._id}
                onEdit={handleEdit}
                onViewMore={handleDetail}
                onDelete={handleDelete}
              />
            )))}
      </Box>

      <WalletEdit editId={editId} onClose={handleEditClose} />
      <WalletDetail detailId={detailId} onClose={handleDetailClose} />
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
    </>
  );
};

export default MobileWallets;
