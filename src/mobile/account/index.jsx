import React from "react";
import Profile from "./layouts/profile";
import Utility from "./layouts/utility";
import AppBar from "../../common/appBar";
import Settings from "./layouts/settings";
import Helmet from "../../common/helmet";
import BottomNav from "../../common/bottomNav";

import { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { resetError } from "../../store/actions/userActions";

const AccountMobile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  return (
    <>
      <Helmet title="Account" />
      <AppBar title={t("account.title")} />
      <Box sx={{ pb: 10, px: 2 }}>
        <Profile />
        <Utility />
        <Settings />
      </Box>
      <BottomNav />
    </>
  );
};

export default AccountMobile;
