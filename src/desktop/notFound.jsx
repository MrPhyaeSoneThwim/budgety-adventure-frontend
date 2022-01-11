import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Container, Box, Typography, Button } from "@mui/material";

import not_found from "../assets/images/not_found.png";

const Root = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  justifyContent: "center",
});

const Wrapper = styled(Container)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

const ErrorImg = styled("img")(({ theme: { breakpoints } }) => ({
  width: "100%",
  [breakpoints.down("sm")]: {
    width: "20rem",
  },
}));

const NotFound = () => {
  return (
    <Root>
      <Wrapper maxWidth="sm">
        <ErrorImg src={not_found} alt="page not found" />
        <Box sx={{ mt: -10, textAlign: "center", pb: 4 }}>
          <Typography sx={{ mt: 2, fontWeight: 600 }} variant="h5">
            Oops!
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            The page you're looking for doesn't exist.
          </Typography>
          <Button
            to="/"
            component={Link}
            color="primary"
            disableElevation
            variant="contained"
            sx={{ mt: 2 }}
          >
            Go To Home
          </Button>
        </Box>
      </Wrapper>
    </Root>
  );
};

export default NotFound;
