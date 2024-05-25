import { APIRequest } from "@/services/api";
import { useStore } from "@/store";

export const useAPI = () => {
  const tenant = useStore((s) => s.tenantName);
  const api = new APIRequest(tenant);

  return { api };
};
