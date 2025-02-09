import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleFormToastErrors } from "@/lib/utils";
import { useAPI } from "@/hooks/useApi";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import UploadMultipleReturns from "../upload-multiple-returns";
import CalculateReturnsModal from "../../modals/calculate-returns";

const Multiple = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null | undefined>(null);
  const { api } = useAPI();
  const { month = "", year = "" } = useParams();
  const [startCalculating, setStartCalculating] = useState(false);
  const [payeId, setPayeId] = useState("");

  const { isPending, mutateAsync } = useMutation({
    mutationFn: api.uploadCompanyPayeReturns,
    onSuccess(data) {
      setStartCalculating(true);
      setPayeId(data?.data?.id);
    },
  });

  const download = async () => {
    api.downloadMonthlyPayeTemplate("company_paye_return.csv");
  };

  const onUpload = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("year", year);
    formData.append("month", month.toUpperCase());
    toast.promise(mutateAsync(formData), {
      success: "Successful",
      loading: "Submitting...",
      error: (error) => handleFormToastErrors(error, "Failed"),
    });
  };

  return (
    <>
      <UploadMultipleReturns
        download={download}
        onUpload={onUpload}
        isPending={isPending}
        file={file}
        setFile={setFile}
      />
      <CalculateReturnsModal
        isLoading={isPending}
        open={startCalculating}
        onClose={() =>
          navigate(`/app/returns/paye/summary/${payeId}?success=true`)
        }
      />
    </>
  );
};

export default Multiple;
