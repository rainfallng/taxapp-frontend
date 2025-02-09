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
import { handleFormErrors, handleFormToastErrors } from "@/lib/utils";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { annualReturnSchema } from "@/lib/schemas/returns/company/annual-returns";
import { AnnualReturnType } from "@/types";
import AnnualReturnsForm from "./annual-returns-form";
import CrossCheckModal from "../../modals/cross-check";
import { useReducerState } from "@/hooks/useReducerState";
import CalculateReturnsModal from "../../modals/calculate-returns";

const SingleAnnualReturnCompute = () => {
  const form = useForm(annualReturnSchema);
  const navigate = useNavigate();
  const { api } = useAPI();
  const { year = "" } = useParams();
  const [modalState, setModalState] = useReducerState({
    open: false,
    values: {} as AnnualReturnType,
    startCalculating: false,
  });

  const { data: countries, isLoading: isLoadingCountries } = useQuery({
    queryKey: [QueryKeys.COUNTRIES],
    queryFn: api.getCountries,
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: api.postCompanyAnnualReturns,
    onError: (error: AxiosError<{ [message: string]: string | string[] }>) => {
      setModalState({
        open: false,
        startCalculating: false,
        values: {} as AnnualReturnType,
      });
      handleFormErrors(error, form.setError);
    },
  });

  const onSubmit = (values: AnnualReturnType) => {
    setModalState({ open: true, values });
  };

  const onProceed = () => {
    setModalState({ open: false, startCalculating: true });
    toast.promise(mutateAsync({ ...modalState.values, year: Number(year) }), {
      success: "Successful",
      loading: "Submitting...",
      error: (error) => handleFormToastErrors(error, "Failed"),
    });
  };

  useLoader(isLoadingCountries, "Please wait...");

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {form.watch("annual_returns").map((_, key) => (
        <AnnualReturnsForm
          key={key}
          form={form}
          index={key}
          countries={countries ?? []}
        />
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
      <CrossCheckModal
        open={modalState.open}
        toggle={() =>
          setModalState({ open: false, values: {} as AnnualReturnType })
        }
        onProceed={onProceed}
      />

      <CalculateReturnsModal
        isLoading={isPending}
        open={modalState.startCalculating}
        onClose={() => navigate("/app/returns/success")}
      />
    </form>
  );
};

export default SingleAnnualReturnCompute;
