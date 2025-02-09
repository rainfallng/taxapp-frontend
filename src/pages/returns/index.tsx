import { useStore } from "@/store";
import { UserType } from "@/types";
import PersonalIncomeTax from "./individual/personal-income-tax";
import { Navigate } from "react-router-dom";

const FileReturns = () => {
  const user = useStore((state) => state.user);

  if (!user) return null;

  if (user.user_type === UserType.INDIVIDUAL) return <PersonalIncomeTax />;

  return <Navigate to="/app/returns/paye" replace />;
};

export default FileReturns;
