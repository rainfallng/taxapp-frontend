import DefaultSuccess from "@/components/features/success";
import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();

  const verified = searchParams.get("verified") === "true";

  return (
    <Box
      sx={{
        width: { lg: "88.9rem" },
      }}
    >
      <DefaultSuccess
        title={
          verified
            ? "Congratulation!"
            : "Thank you! our Tax Identification Number will be generated in a few days"
        }
        description={
          verified
            ? "Your details have been verified successfully"
            : "Your can proceed to your dashboard while we generate your Identification Number"
        }
        linkText="Proceed to dashboard"
        href="/app"
      />
    </Box>
  );
};

export default SuccessPage;
