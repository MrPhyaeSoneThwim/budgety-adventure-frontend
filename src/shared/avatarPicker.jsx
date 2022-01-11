import React from "react";
import Dropzone from "react-dropzone";

import { AddAPhoto } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { styled, useTheme, alpha } from "@mui/material/styles";

const PickerWrapper = styled(Box)(({ theme: { breakpoints } }) => ({
  padding: 4,
  width: "98px",
  height: "98px",
  borderRadius: "50%",
  flexShrink: 0,
  border: "1px dashed rgba(145, 158, 171, 0.32)",
  [breakpoints.down("md")]: {
    width: "128px",
    height: "128px",
  },
}));

const Preview = styled(Box)({
  zIndex: 0,
  width: "100%",
  height: "100%",
  cursor: "pointer",
  outline: "none",
  display: "flex",
  overflow: "hidden",
  borderRadius: "50%",
  position: "relative",
  alignItems: " center",
  justifyContent: "center",
  paddingTop: "100%",
});

const Picker = styled(Box)({
  zIndex: 0,
  width: "100%",
  height: "100%",
  cursor: "pointer",
  outline: "none",
  display: "flex",
  overflow: "hidden",
  borderRadius: "50%",
  position: "relative",
  alignItems: " center",
  justifyContent: "center",
});

const Img = styled("img")({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  height: "100%",
  display: "block",
  objectFit: "cover",
  position: "absolute",
  objectPosition: "center",
});

const AvatarPicker = ({ name, image, preview, handlePreview, onChange, label }) => {
  const { palette } = useTheme();

  const placeholderStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    position: "absolute",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    color: palette.grey[500],
    backgroundColor: palette.mode === "light" ? palette.grey[100] : palette.grey[700],
    "&:hover": {
      backgroundColor: palette.mode === "light" ? palette.grey[200] : palette.grey[800],
    },
  };

  const placeholderActiveStyle = {
    opacity: 0,
    "&:hover": {
      opacity: 1,
      color: alpha(palette.common.white, 0.85),
      backgroundColor: alpha(palette.grey[800], 0.5),
    },
  };

  return (
    <Dropzone
      multiple={false}
      accept="image/jpeg, image/png, image/jpg"
      onDrop={(acceptedFiles) => {
        onChange(name, acceptedFiles[0]);
        handlePreview(URL.createObjectURL(acceptedFiles[0]));
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <PickerWrapper>
          <Picker {...getRootProps()}>
            <input {...getInputProps()} />
            {(preview || image) && (
              <Preview>
                <Img alt="avatar" src={preview ? preview : image} />
              </Preview>
            )}
            <Box sx={{ ...placeholderStyle, ...((preview || image) && placeholderActiveStyle) }}>
              <AddAPhoto />
              <Typography variant="caption">{label}</Typography>
            </Box>
          </Picker>
        </PickerWrapper>
      )}
    </Dropzone>
  );
};

export default AvatarPicker;
