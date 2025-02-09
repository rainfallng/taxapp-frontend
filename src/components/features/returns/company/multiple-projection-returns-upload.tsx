import { useAPI } from "@/hooks/useApi";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import UploadMultipleReturns from "../upload-multiple-returns";
import toast from "react-hot-toast";
import { handleFormToastErrors } from "@/lib/utils";
import CalculateReturnsModal from "../../modals/calculate-returns";

const MultipleProjectionReturnsUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null | undefined>(null);
  const { api } = useAPI();
  const { year = "" } = useParams();
  const [startCalculating, setStartCalculating] = useState(false);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: api.uploadCompanyProjectionReturns,
    onError() {
      setStartCalculating(false);
    },
  });

  const download = async () => {
    api.downloadProjectionReturnTemplate("company_annual_return.csv");
  };

  const onUpload = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("year", year);
    setStartCalculating(true);
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

export default MultipleProjectionReturnsUpload;
