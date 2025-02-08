import IdentificationForm from "@/components/features/returns/identification-form";
import GoBack from "@/components/ui/go-back";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreatePersonalIncomeTax = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: "4rem" }}>
      <GoBack onClick={() => navigate("/app/returns")}>Personal Income Tax</GoBack>
      <Box sx={{ maxWidth: "55.8rem", mx: "auto", mt: "3.2rem" }}>
        <IdentificationForm onSubmit={() => {}} />
      </Box>
    </Box>
  );
};

export default CreatePersonalIncomeTax;
