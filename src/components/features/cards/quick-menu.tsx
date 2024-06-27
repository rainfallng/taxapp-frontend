import { Box, Typography } from "@mui/material";
import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const QuickMenuCard: FC<{ icon: ReactNode; text: string; link: string }> = ({
  icon,
  text,
  link,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(link)}
      sx={{
        p: "2rem",
        border: "1px solid",
        borderColor: (theme) => theme.palette.grey[200],
        borderRadius: "1.6rem",
        height: "30.3rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "4.3rem",
        cursor: "pointer",
      }}
    >
      {icon}
      <Typography
        sx={{ fontSize: "2rem", fontWeight: 600, textAlign: "center" }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default QuickMenuCard;
