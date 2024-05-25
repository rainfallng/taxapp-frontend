import VerifyCode from "@/components/features/verify-code";
import Protected from "@/components/layouts/protected";
import { useAPI } from "@/hooks/useApi";
import { useStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

const VerifyPhone = () => {
  const { user } = useStore();
  const { api } = useAPI();
  const navigate = useNavigate()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: api.verifyAuthOtp,
    onSuccess() {
      navigate('/app/onboarding')
    },
  })

  return (
    <Protected>
      <VerifyCode phone={user.phone} verifying={isPending} verify={async (code) => mutateAsync({ token: code })} send={api.sendAuthOtp} />
    </Protected>
  );
};

export default VerifyPhone;
