
import TaxImplicationBill from "@/components/features/returns/paye/tax-implication-bill";
import { useSearchParams } from "react-router-dom";

const PayeBill = () => {
    const [searchParams] = useSearchParams();
    const billId = searchParams.get("billId") ?? '';

  return <TaxImplicationBill billId={billId} />;
};

export default PayeBill;
