import VerifyCode from "@/components/features/verify-code";
import { useAPI } from "@/hooks/useApi";
import { useStore } from "@/store";
import { UserType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const VerifyConsultantIdentity = () => {
  const { consultantOnboarding, setConsultantOnboarding, setUser, user } = useStore();
  const { api } = useAPI();
  const navigate = useNavigate();
  const isTaxConsultant = user.user_type === UserType.TAX_CONSULTANT;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: isTaxConsultant
      ? api.verifyProfileIdentification
      : api.verifyConsultantIdentification,
    onSuccess(data, variable) {
      setConsultantOnboarding({
        otp: variable.otp,
      });
      setUser({
        first_name: data?.data?.first_name,
        last_name: data?.data?.last_name,
        phone: data?.data?.phone_number_1,
      })
      navigate("/auth/onboarding/consultant/request");
    },
  });

  return (
    <VerifyCode
      initiateOnLoad={false}
      shortText={consultantOnboarding.id_type}
      verifying={isPending}
      verify={async (code) =>
        mutateAsync({ ...consultantOnboarding, otp: code })
      }
      send={() =>
        api[
          isTaxConsultant ? "profileIdentification" : "consultantIdentification"
        ]({
          id_number: consultantOnboarding.id_number,
          id_type: consultantOnboarding.id_type,
        })
      }
    />
  );
};

export default VerifyConsultantIdentity;
