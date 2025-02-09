import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleFormToastErrors } from "@/lib/utils";
import { useAPI } from "@/hooks/useApi";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import UploadMultipleReturns from "../upload-multiple-returns";
import CalculateReturnsModal from "../../modals/calculate-returns";

const MultipleAnnualReturnsUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null | undefined>(null);
  const { api } = useAPI();
  const { year = "" } = useParams();
  const [startCalculating, setStartCalculating] = useState(false);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: api.uploadCompanyAnnualReturns,
    onError() {
      setStartCalculating(false);
    },
  });

  const download = async () => {
    api.downloadAnnualReturnTemplate("company_annual_return.csv");
  };

  const onUpload = () => {
    if (!file) return;
    setStartCalculating(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("year", year);
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
        onClose={() => navigate("/app/returns/success")}
      />
    </>
  );
};

export default MultipleAnnualReturnsUpload;
