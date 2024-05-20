import VerifyCode from "@/components/features/verify-code";
import Protected from "@/components/layouts/protected";

const VerifyPhone = () => {
  return (
    <Protected>
        <VerifyCode />
    </Protected>
  );
};

export default VerifyPhone;
