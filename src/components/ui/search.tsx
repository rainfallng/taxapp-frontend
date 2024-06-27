import { Box } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Search = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "0.8rem",
        alignItems: "center",
        px: "1.1rem",
        py: "0.9rem",
        border: "1px solid",
        borderColor: "#D0D0D0",
        borderRadius: "3rem",
      }}
    >
      <SearchOutlinedIcon sx={{ width: "1.75rem", height: "1.75rem" }} />
      <Box
        component="input"
        width="100%"
        sx={{ bgcolor: "transparent", border: "none", outline: "none" }}
        placeholder="Search"
      />
    </Box>
  );
};

export default Search;
