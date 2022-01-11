import { alpha, styled } from "@mui/material/styles";
import { ButtonBase, Typography } from "@mui/material";
import { CalendarIcon } from "../assets/icons";
import { useTheme } from "@mui/material/styles";

const DateButtonStyle = styled(ButtonBase)(({ theme: { spacing, palette } }) => ({
  textTransform: "capitalize",
  paddingLeft: spacing(1.5),
  paddingRight: spacing(1.5),
  paddingTop: spacing(0.875),
  paddingBottom: spacing(0.875),
  borderRadius: spacing(6),
  color: palette.mode === "light" ? palette.grey[600] : palette.grey[100],
  backgroundColor: palette.mode === "light" ? palette.grey[300] : alpha(palette.common.white, 0.12),
}));

const DateButton = ({ inputProps }) => {
  const { palette } = useTheme();
  return (
    <DateButtonStyle onClick={inputProps.onClick}>
      <CalendarIcon
        size={20}
        color={palette.mode === "light" ? palette.grey[700] : palette.grey[200]}
      />
      <Typography variant="button" sx={{ textTransform: "capitalize", ml: 1 }}>
        {inputProps.value}
      </Typography>
    </DateButtonStyle>
  );
};

export default DateButton;
