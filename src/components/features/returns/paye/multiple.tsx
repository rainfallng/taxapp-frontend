import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleFormToastErrors } from "@/lib/utils";
import { useAPI } from "@/hooks/useApi";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import UploadMultipleReturns from "../upload-multiple-returns";

const Multiple = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null | undefined>(null);
  const { api } = useAPI();
  const { month = "", year = "" } = useParams();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: api.uploadCompanyPayeReturns,
    onSuccess() {
      navigate(`/app/returns/success`);
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
    <UploadMultipleReturns
      download={download}
      onUpload={onUpload}
      isPending={isPending}
      file={file}
      setFile={setFile}
    />
  );
};

export default Multiple;
