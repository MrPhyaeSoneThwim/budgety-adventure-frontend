import React from "react";
import { Hidden } from "@mui/material";
import { useTranslation } from "react-i18next";

import Chart from "./layouts/chart";
import Layout from "../../common/layout";
import AppBar from "../../common/appBar";
import BottomNav from "../../common/bottomNav";
import Categories from "./layouts/categories";

import Helmet from "../../common/helmet";

const Statistic = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet title="Statistic" />
      <Hidden mdUp>
        <AppBar title={t("statistic.title")} />
      </Hidden>
      <Layout maxWidth="lg">
        <Chart />
        <Categories />
      </Layout>
      <Hidden mdUp>
        <BottomNav />
      </Hidden>
    </>
  );
};

export default Statistic;
