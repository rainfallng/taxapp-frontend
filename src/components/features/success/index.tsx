import { Box, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import Button from "../../ui/button";
import { useNavigate } from "react-router-dom";

const DefaultSuccess: FC<{
  href?: string;
  linkText?: string;
  title?: string;
  description?: string;
}> = ({ href, linkText, title, description }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        py: "9.6rem",
      }}
    >
      <Box
        component="img"
        src="/assets/svgs/smiley.svg"
        alt=""
        sx={{ width: "11.2rem", height: "11.2rem" }}
      />
      <Typography
        variant="h4"
        sx={{
          color: theme.palette.grey[800],
          fontSize: "3.2rem",
          fontWeight: 600,
          my: "1.6rem",
        }}
      >
        {title}
      </Typography>
      <Typography sx={{ fontSize: "1.8rem", mb: "4rem" }}>
        {description}
      </Typography>
      {linkText && (
        <Button
          onClick={() => navigate(href ?? "/")}
          sx={{ fontSize: "1.8rem", borderRadius: "5rem", px: "2.4rem" }}
        >
          {linkText}
        </Button>
      )}
    </Box>
  );
};

export default DefaultSuccess;
