import AuthSuccess from "@/components/features/auth-success";

const TaxRetrievalSuccess = () => {
  return (
    <AuthSuccess
      title="Tax Payer ID Retrieved!"
      detail="Your Tax Payer ID has been sent to your phone number or email registered with profile."
    />
  );
};

export default TaxRetrievalSuccess;
