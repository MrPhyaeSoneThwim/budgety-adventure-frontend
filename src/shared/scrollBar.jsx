import PropTypes from "prop-types";
import SimpleBarReact from "simplebar-react";
import { alpha, styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import "simplebar/dist/simplebar.min.css";

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  flex: 1,
  "& .simplebar-scrollbar": {
    "&:before": {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    "&.simplebar-visible:before": {
      opacity: 1,
    },
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 10,
  },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
    height: 6,
  },
  "& .simplebar-mask": {
    zIndex: "inherit",
  },
}));

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default function Scrollbar({ children, sx, ...other }) {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile) {
    return (
      <Box sx={{ overflowX: "auto", ...sx, width: "100%" }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
      {children}
    </SimpleBarStyle>
  );
}
