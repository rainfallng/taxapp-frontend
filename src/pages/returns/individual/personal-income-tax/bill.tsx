import TaxImplicationBill from "@/components/features/returns/tax-implication-bill";
import { useParams } from "react-router-dom";

const PersonalIncomeTaxBill = () => {
  const { id = "" } = useParams();

  return <TaxImplicationBill id={id} name="Personal Income Tax" type="pit" />;
};

export default PersonalIncomeTaxBill;
