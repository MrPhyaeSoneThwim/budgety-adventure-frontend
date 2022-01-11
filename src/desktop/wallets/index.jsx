import React from "react";
import { Hidden } from "@mui/material";
import { useTranslation } from "react-i18next";

import AppBar from "../../common/appBar";
import Layout from "../../common/layout";
import BottomNav from "../../common/bottomNav";

import WalletList from "./layouts/walletList";
import WalletStats from "./layouts/walletStats";

import Helmet from "../../common/helmet";

const Wallets = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet title="Wallets" />
      <Hidden mdUp>
        <AppBar title={t("wallets.title")} />
      </Hidden>
      <Layout maxWidth="lg">
        <WalletList />
        <WalletStats />
      </Layout>
      <Hidden mdUp>
        <BottomNav />
      </Hidden>
    </>
  );
};

export default Wallets;
