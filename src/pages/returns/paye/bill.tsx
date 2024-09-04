import TaxImplicationBill from "@/components/features/returns/paye/tax-implication-bill";
import { useParams } from "react-router-dom";

const PayeBill = () => {
  const { billId = "", month = "" } = useParams();

  return <TaxImplicationBill billId={billId} month={month} />;
};

export default PayeBill;
