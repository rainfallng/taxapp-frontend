import DefaultSuccess from "@/components/features/success";
import { Box } from "@mui/material";

const SuccessPage = () => {
  return (
    <Box
      sx={{
        width: { lg: "88.9rem" },
      }}
    >
      <DefaultSuccess
        title="Congratulation!"
        description="Your details have been successfully verified."
        linkText="Proceed to dashboard"
        href="/app"
      />
    </Box>
  );
};

export default SuccessPage;
