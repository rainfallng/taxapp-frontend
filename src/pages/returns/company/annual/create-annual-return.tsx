import IdentificationForm from "@/components/features/returns/identification-form";
import GoBack from "@/components/ui/go-back";
import { Box } from "@mui/material";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { TABS } from "./constants";

const CreateAnnualReturn = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const tab = (params.get("tab") ?? "annual") as keyof typeof TABS;

  const title = TABS[tab];

  if (!title) return <Navigate to="/app/returns" />;

  return (
    <Box sx={{ p: "4rem" }}>
      <GoBack onClick={() => navigate(-1)}>{title}</GoBack>
      <Box sx={{ maxWidth: "55.8rem", mx: "auto", mt: "3.2rem" }}>
        <IdentificationForm
          onSubmit={(values) =>
            navigate(`/app/returns/annual/${tab}/${values.year_in_view}`)
          }
        />
      </Box>
    </Box>
  );
};

export default CreateAnnualReturn;
