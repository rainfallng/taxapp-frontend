import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";

export const useLoader = (
  loading: boolean,
  text?: string,
  mode: "toast" | "overlay" = "toast",
  enabled = true
) => {
  const getLoader = useCallback(() => {
    if (!enabled) return
    if (!loading) return toast.remove();
    if (mode === "toast") return toast.loading(text || "Please wait...");
  }, [loading, mode, enabled, text]);

  useEffect(() => {
    getLoader();
  }, [getLoader]);
};
