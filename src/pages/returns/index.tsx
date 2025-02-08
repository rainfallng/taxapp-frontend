import { useStore } from "@/store";
import { UserType } from "@/types";
import PersonalIncomeTax from "./individual/personal-income-tax";
import MonthlyPaye from "@/components/features/returns/company/monthly-paye";

const FileReturns = () => {
  const user = useStore((state) => state.user);

  if (!user) return null;

  if (user.user_type === UserType.INDIVIDUAL) return <PersonalIncomeTax />;

  return <MonthlyPaye />;
};

export default FileReturns;
