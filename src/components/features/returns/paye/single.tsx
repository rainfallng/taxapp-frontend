import Button from "@/components/ui/button";
import { useAPI } from "@/hooks/useApi";
import { useLoader } from "@/hooks/useLoader";
import { QueryKeys } from "@/lib/queryKeys";
import { Box } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useParams } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { payeSchema } from "@/lib/schemas/returns/company/paye";
import StaffForm from "./staff-form";
import { handleFormErrors, handleFormToastErrors } from "@/lib/utils";
import { AxiosError } from "axios";
import { AddCompanyStaffReturn } from "@/types/returns";
import toast from "react-hot-toast";

const Single = () => {
  const form = useForm(payeSchema);
  const navigate = useNavigate();
  const { month = '' } = useParams()
  const { api } = useAPI();
  const { data: states, isLoading: isLoadingStates } = useQuery({
    queryKey: [QueryKeys.STATES],
    queryFn: api.getStates,
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: api.postCompanyReturns,
    onSuccess(data) {
      navigate(`/app/returns/paye/${month}/bill?billId=${data?.data?.bill}`);
    },
    onError: (error: AxiosError<{ [message: string]: string | string[] }>) =>
      handleFormErrors(error, form.setError),
  });

  const onSubmit = (values: { returns: AddCompanyStaffReturn[] }) => {
    toast.promise(mutateAsync(values), {
      success: "Successful",
      loading: "Submitting...",
      error: (error) => handleFormToastErrors(error, "Failed"),
    });
  };

  useLoader(isLoadingStates, "Please wait...");

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {form.watch("returns").map((_, key) => (
        <StaffForm key={key} form={form} index={key} states={states} />
      ))}
      <Box
        sx={{
          display: "flex",
          gap: "1.6rem",
          justifyContent: "flex-end",
          mt: "4rem",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            borderRadius: "5rem",
            py: "1rem",
            px: "2.4rem",
          }}
        >
          <ArrowBackIosNewIcon sx={{ mr: "0.8rem" }} />
          Back
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            borderRadius: "5rem",
            py: "1rem",
            px: "2.4rem",
          }}
        >
          Next
          <ArrowForwardIosIcon sx={{ ml: "0.8rem" }} />
        </Button>
      </Box>
    </form>
  );
};

export default Single;
