import VerifyCode from "@/components/features/verify-code";
import Protected from "@/components/layouts/protected";
import { useAPI } from "@/hooks/useApi";
import { getLS, removeLS } from "@/lib/utils";
import { useStore } from "@/store";
import { IVerifyCAC } from "@/types/form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const VerifyCompany = () => {
  const { user, setUser } = useStore();
  const { api } = useAPI();
  const navigate = useNavigate();
  const companyInfo = getLS("company-info") as IVerifyCAC;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: api.confirmCAC,
    onSuccess(data) {
      removeLS("company-info");
      setUser({ tin_profile: data?.data });
      navigate("/auth/onboarding/company-profile");
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
        send={() => api.verifyCAC(companyInfo)}
      />
    </Protected>
  );
};

export default VerifyCompany;
