import VerifyCode from "@/components/features/verify-code";
import Protected from "@/components/layouts/protected";
import { useAPI } from "@/hooks/useApi";
import { getLS, removeLS } from "@/lib/utils";
import { useStore } from "@/store";
import { IIndividualOnboardingInput } from "@/types/form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const VerifyIndividual = () => {
  const { user, setUser } = useStore();
  const { api } = useAPI();
  const navigate = useNavigate();
  const companyInfo = getLS("individual-info") as Omit<IIndividualOnboardingInput, "date_of_birth">;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: api.verifyProfileIdentification,
    onSuccess(data) {
      console.log({ data })
      removeLS("individual-info");
      setUser(data?.data);
      navigate("/auth/onboarding/personal-info");
    },
  });

  return (
    <Protected>
      <VerifyCode
        initiateOnLoad={false}
        shortText="company"
        email={user.email}
        verifying={isPending}
        verify={async (code) => mutateAsync({ otp: code, ...companyInfo })}
        send={() => api.profileIdentification(companyInfo)}
      />
    </Protected>
  );
};

export default VerifyIndividual;
