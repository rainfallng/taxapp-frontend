import AuthSuccess from "@/components/features/auth-success";

const ConsultantSuccess = () => {
    return (
      <AuthSuccess
        title="Verified Successfully!"
        detail="Your personal details and identification has been verified successfully. You can proceed to your dashboard"
        linkText="Proceed to Signin"
      />
    );
}

export default ConsultantSuccess