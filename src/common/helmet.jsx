import React from "react";

import { Helmet as HelmetConfig } from "react-helmet";

const Helmet = ({ title }) => {
  return (
    <HelmetConfig>
      <meta charSet="utf-8" />
      <title>Budgety | {title}</title>
    </HelmetConfig>
  );
};

export default Helmet;
