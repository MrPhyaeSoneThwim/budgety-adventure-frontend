import React from "react";
import Layout from "../../common/layout";
import Profile from "./layouts/profile";
import Settings from "./layouts/settings";
import Helmet from "../../common/helmet";
const Account = () => {
  return (
    <>
      <Helmet title="Account" />
      <Layout maxWidth="lg">
        <Profile />
        <Settings />
      </Layout>
    </>
  );
};

export default Account;
