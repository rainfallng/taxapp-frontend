import { useStore } from "@/store";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const TenantCheck = ({ children }: { children: ReactNode }) => {
  const { tenantName } = useStore();
  const { pathname } = useLocation();

  if (!tenantName) return <Navigate to="/auth" state={{ pathname }} />;

  return children;
};

export default TenantCheck;
