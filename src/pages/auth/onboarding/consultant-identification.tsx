import VerifyIdentity from "@/components/features/onboarding/verify-identity";
import { useAPI } from "@/hooks/useApi";
import { identificationSchema } from "@/lib/schemas/onboarding/consultant-identification";
import { handleFormErrors, handleFormToastErrors } from "@/lib/utils";
import { useStore } from "@/store";
import { UserType } from "@/types";
import { IIndividualOnboardingInput } from "@/types/form";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ConsultantIdentification = () => {
  const navigate = useNavigate();
  const { api } = useAPI();
  const { setConsultantOnboarding, user } = useStore();
  const isTaxConsultant = user.user_type === UserType.TAX_CONSULTANT;
  const form = useForm({
    defaultValues: identificationSchema.defaultValues,
    resolver: identificationSchema.resolver,
  });
  const { mutateAsync: consultantIdentification, isPending } = useMutation({
    mutationFn: isTaxConsultant
      ? api.profileIdentification
      : api.consultantIdentification,
    onSuccess() {
      setConsultantOnboarding(form.getValues());
      navigate("/auth/onboarding/consultant/verify");
    },
    onError: (error: AxiosError<{ [message: string]: string | string[] }>) =>
      handleFormErrors(error, form.setError),
  });

  const onSubmit = (
    values: Omit<IIndividualOnboardingInput, "date_of_birth">
  ) => {
    toast.promise(consultantIdentification(values), {
      success: "Identification successful",
      loading: "Please wait...",
      error: (error) => handleFormToastErrors(error, "Identification failed"),
    });
  };

  return (
    <VerifyIdentity
      form={form}
      isPending={isPending}
      showDOB={false}
      onSubmit={onSubmit}
    />
  );
};

export default ConsultantIdentification;
