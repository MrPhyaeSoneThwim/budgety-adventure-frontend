import { TextField as MuiTextField } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const TextField = styled((props) => (
  <MuiTextField fullWidth InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: `1px solid ${
      theme.palette.mode === "light"
        ? alpha(theme.palette.common.black, 0.12)
        : alpha(theme.palette.common.white, 0.23)
    }`,
    overflow: "hidden",
    borderRadius: 12,
    backgroundColor: "transparent",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default TextField;
