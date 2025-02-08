import IdentificationForm from "@/components/features/returns/identification-form";
import GoBack from "@/components/ui/go-back";
import { useAPI } from "@/hooks/useApi";
import { postReturnSchema } from "@/lib/schemas/returns/post-return";
import { handleFormErrors, handleFormToastErrors } from "@/lib/utils";
import { IIndividualReturn } from "@/types";
import { Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreatePersonalIncomeTax = () => {
  const navigate = useNavigate();
  const { api } = useAPI();
  const form = useForm(postReturnSchema);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: api.postIndividualReturns,
    onSuccess: (data, variables) => {
      navigate(
        `/app/returns/personal-income-tax/${data?.id}/${variables.year_in_view}`
      );
    },
    onError: (error: AxiosError<{ [message: string]: string | string[] }>) =>
      handleFormErrors(error, form.setError),
  });

  const onSubmit = (values: IIndividualReturn) => {
    toast.promise(mutateAsync(values), {
      success: "Successful",
      loading: "Please wait...",
      error: (error) => handleFormToastErrors(error, "Failed"),
    });
  };

  return (
    <Box sx={{ p: "4rem" }}>
      <GoBack onClick={() => navigate("/app/returns")}>
        Personal Income Tax
      </GoBack>
      <Box sx={{ maxWidth: "55.8rem", mx: "auto", mt: "3.2rem" }}>
        <IdentificationForm
          isPending={isPending}
          onSubmit={({ year_in_view }) =>
            onSubmit({
              return_type: "PERSONAL INCOME TAX",
              year_in_view,
            })
          }
        />
      </Box>
    </Box>
  );
};

export default CreatePersonalIncomeTax;
