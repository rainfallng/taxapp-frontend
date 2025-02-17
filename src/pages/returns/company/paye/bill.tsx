import TaxImplicationBill from "@/components/features/returns/tax-implication-bill";
import { useParams } from "react-router-dom";

const PayeBill = () => {
  const { id = "" } = useParams();

  return <TaxImplicationBill id={id} name="Monthly PAYE" type="paye" />;
};

export default PayeBill;
