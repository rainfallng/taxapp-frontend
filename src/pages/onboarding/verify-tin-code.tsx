import { Box } from "@mui/material";
import VerifyCode from "@/components/features/verify-code";

const VerifyTINCode = () => {
  return (
    <Box sx={{ py: "7rem" }}>
      <Box
        width="100%"
        sx={{
          padding: "3.93rem 3.2rem",
          borderRadius: "1rem",
          border: "1px solid #D2D2E0",
          maxWidth: "40.9rem",
          mx: "auto",
        }}
      >
        <VerifyCode phone="" />
      </Box>
    </Box>
  );
};

export default VerifyTINCode;
