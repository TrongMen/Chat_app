import { styled } from "@mui/material/styles";

const SearchInconWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  padding: theme.spacing(0, 2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  pointerEvents: "none",
}));

export default SearchInconWrapper;
