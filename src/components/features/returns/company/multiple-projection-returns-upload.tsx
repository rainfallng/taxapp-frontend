import { useAPI } from "@/hooks/useApi";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import UploadMultipleReturns from "../upload-multiple-returns";
import toast from "react-hot-toast";
import { handleFormToastErrors } from "@/lib/utils";

const MultipleProjectionReturnsUpload = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null | undefined>(null);
    const { api } = useAPI();
    const { year = "" } = useParams();
  
    const { isPending, mutateAsync } = useMutation({
      mutationFn: api.uploadCompanyProjectionReturns,
      onSuccess() {
        navigate(`/app/returns/success`);
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
}

export default MultipleProjectionReturnsUpload
