import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";

export const useLoader = (
  loading: boolean,
  text?: string,
  mode: "toast" | "overlay" = "toast"
) => {
  const getLoader = useCallback(() => {
    if (!loading) return toast.remove();
    if (mode === "toast") return toast.loading(text || "Please wait...");
  }, [loading, mode, text]);

  useEffect(() => {
    getLoader();
  }, [getLoader]);
};
