import VerifyIdentity from "@/components/features/onboarding/verify-identity";
import { useAPI } from "@/hooks/useApi";
import { identificationSchema } from "@/lib/schemas/onboarding/identification";
import { handleFormErrors, handleFormToastErrors } from "@/lib/utils";
import { useStore } from "@/store";
import { IIndividualOnboardingInput } from "@/types/form";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Identification = () => {
  const navigate = useNavigate();
  const { api } = useAPI();
  const { setUser } = useStore();
  const form = useForm({
    defaultValues: identificationSchema.defaultValues,
    resolver: identificationSchema.resolver,
  });
  const { mutateAsync: individualIdentification, isPending } = useMutation({
    mutationFn: api.individualIdentification,
    onSuccess(data) {
      setUser({ tin_profile: data?.data });
      navigate("/auth/onboarding/personal-info");
    },
    onError: (error: AxiosError<{ [message: string]: string | string[] }>) =>
      handleFormErrors(error, form.setError),
  });

  const onSubmit = (values: IIndividualOnboardingInput) => {
    toast.promise(individualIdentification(values), {
      success: "Identification successful",
      loading: "Please wait...",
      error: (error) => handleFormToastErrors(error, "Identification failed"),
    });
  };

  return <VerifyIdentity form={form} isPending={isPending} onSubmit={onSubmit} />;
};

export default Identification;
