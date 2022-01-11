import React from "react";
import { Hidden } from "@mui/material";
import { useTranslation } from "react-i18next";

import Charts from "./layouts/charts";
import AppBar from "../../common/appBar";
import Layout from "../../common/layout";

import BottomNav from "../../common/bottomNav";
import Transactions from "./layouts/transactions";

import Helmet from "../../common/helmet";

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet title="Dashboard" />
      <Hidden mdUp>
        <AppBar title={t("dashboard.title")} />
      </Hidden>
      <Layout maxWidth="lg">
        <Charts />
        <Transactions />
      </Layout>
      <Hidden mdUp>
        <BottomNav />
      </Hidden>
    </>
  );
};

export default Dashboard;
