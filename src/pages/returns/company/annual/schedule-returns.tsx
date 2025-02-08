import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import GoBack from "@/components/ui/go-back";
import ScheduleReturnsForm from "@/components/features/returns/company/schedule-returns-form";

const ScheduleReturns = () => {
    const navigate = useNavigate();
  
    return (
      <Box sx={{ py: "4.6rem", px: "3.2rem" }}>
        <GoBack onClick={() => navigate("/app/returns")}>
          Schedule Returns
        </GoBack>
        <Box sx={{ maxWidth: "84.4rem", mx: "auto", mt: "2rem" }}>
          <ScheduleReturnsForm />
        </Box>
      </Box>
    );
}

export default ScheduleReturns
