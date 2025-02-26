import DefaultSuccess from "@/components/features/success";
import { useStore } from "@/store";
import { Box } from "@mui/material";

const ReturnsSuccess = () => {
  const { tenant } = useStore()

  return (
    <Box
      sx={{
        maxWidth: { lg: "47rem" },
        mx: "auto",
      }}
    >
      <DefaultSuccess
        title={`Your tax filing has been successfully submitted to the ${tenant.acronym}.`}
        description="You will receive an email notification once the filing status is updated. In the meantime, you can track the progress by checking your Filing History"
        linkText="Proceed to dashboard"
        href="/app/home"
      />
    </Box>
  );
};

export default ReturnsSuccess;
