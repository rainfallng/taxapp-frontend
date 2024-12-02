import VerifyCode from "@/components/features/verify-code";
import Protected from "@/components/layouts/protected";
import { useAPI } from "@/hooks/useApi";
import { getLS, removeLS } from "@/lib/utils";
import { useStore } from "@/store";
import { UserType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const VerifyTIN = () => {
  const { user, setUser } = useStore();
  const { api } = useAPI();
  const navigate = useNavigate();

  const isCompany = user.user_type === UserType.COMPANY;

  const id_type = isCompany ? "CTIN" : "TIN";

  const tin = (getLS("tin") as { tin?: string })?.tin ?? "";

  const { mutateAsync, isPending } = useMutation({
    mutationFn: api.verifyProfileIdentification,
    onSuccess(data) {
      removeLS("tin");
      setUser(data?.data);
      navigate("/auth/onboarding/success");
    },
  });

  return (
    <Protected>
      <VerifyCode
        initiateOnLoad={false}
        shortText="Tax Identification Number (TIN)"
        phone={user.phone}
        email={user.email}
        verifying={isPending}
        verify={async (code) =>
          mutateAsync({
            otp: code,
            id_type,
            id_number: tin,
          })
        }
        send={() =>
          api.profileIdentification({
            id_type,
            id_number: tin,
          })
        }
      />
    </Protected>
  );
};

export default VerifyTIN;
