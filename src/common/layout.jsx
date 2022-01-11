import React from "react";

import SideBar from "./sideBar";

import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";

const LayoutWrapper = styled(Container)(({ theme: { breakpoints } }) => ({
  height: "100vh",
  display: "flex",
  flexWrap: "no-wrap",
  overflow: "hidden",
  [breakpoints.down("lg")]: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  [breakpoints.down("md")]: {
    height: "auto",
  },
  "@media (min-width:1400px)": {
    maxWidth: 1200,
  },
}));

const Layout = ({ children }) => {
  return (
    <LayoutWrapper maxWidth="lg">
      <SideBar />
      {children}
    </LayoutWrapper>
  );
};

export default Layout;
