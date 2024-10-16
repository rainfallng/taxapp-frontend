import AuthSuccess from "@/components/features/auth-success";

const ConsultantRequestSuccess = () => {
    return (
      <AuthSuccess
        title="Your registration request has been submitted for review."
        detail="You will receive an email after further assessment has been made on your submission."
        linkText="Go back to website"
        linkTo="https://usetaxapp.ng"
      />
    );
}

export default ConsultantRequestSuccess