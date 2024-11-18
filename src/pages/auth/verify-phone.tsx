import VerifyCode from "@/components/features/verify-code";
import Protected from "@/components/layouts/protected";
import { useAPI } from "@/hooks/useApi";
import { useStore } from "@/store";
import { UserType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const VerifyPhone = () => {
  const { user } = useStore();
  const { api } = useAPI();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: api.verifyAuthOtp,
    onSuccess() {
      const onboardingLink =
        user.user_type === UserType.INDIVIDUAL
          ? "/auth/onboarding/identification"
          : "/auth/onboarding/company-info";
      navigate(onboardingLink);
    },
  });

  return (
    <Protected>
      <VerifyCode
        shortText="phone number and email"
        phone={user.phone}
        email={user.email}
        verifying={isPending}
        verify={async (code) => mutateAsync({ token: code })}
        send={api.sendAuthOtp}
      />
    </Protected>
  );
};

export default VerifyPhone;
