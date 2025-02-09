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
import CrossCheckModal from "../../modals/cross-check";
import { useReducerState } from "@/hooks/useReducerState";
import CalculateReturnsModal from "../../modals/calculate-returns";
import { useState } from "react";

const Single = () => {
  const form = useForm(payeSchema);
  const navigate = useNavigate();
  const { api } = useAPI();
  const { month = "", year = "" } = useParams();
  const [modalState, setModalState] = useReducerState({
    open: false,
    openCalculate: false,
    values: {} as AddCompanyStaffReturn,
  });
  const [payeId, setPayeId] = useState("");

  const { data: states, isLoading: isLoadingStates } = useQuery({
    queryKey: [QueryKeys.STATES],
    queryFn: api.getStates,
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: api.postCompanyPayeeReturns,
    onSuccess(data) {
      setPayeId(data?.data?.id);
    },
    onError: (error: AxiosError<{ [message: string]: string | string[] }>) => {
      handleFormErrors(error, form.setError);
      setModalState({
        open: false,
        openCalculate: false,
        values: {} as AddCompanyStaffReturn,
      });
    },
  });

  const onSubmit = (values: AddCompanyStaffReturn) => {
    setModalState({ open: true, values });
  };

  const onProceed = () => {
    setModalState({ openCalculate: true, open: false });
    toast.promise(
      mutateAsync({ ...modalState.values, year, month: month.toUpperCase() }),
      {
        success: "Successful",
        loading: "Submitting...",
        error: (error) => handleFormToastErrors(error, "Failed"),
      }
    );
  };

  useLoader(isLoadingStates, "Please wait...");

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {form.watch("monthly_payees").map((_, key) => (
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
      <CrossCheckModal
        open={modalState.open}
        toggle={() =>
          setModalState({ open: false, values: {} as AddCompanyStaffReturn })
        }
        onProceed={onProceed}
      />
      <CalculateReturnsModal
        isLoading={isPending}
        open={modalState.openCalculate}
        onClose={() =>
          navigate(
            `/app/returns/paye/summary/${payeId}?success=true&month=${month}`
          )
        }
      />
    </form>
  );
};

export default Single;
