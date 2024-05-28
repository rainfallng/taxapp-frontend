import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "@/store";

const Protected: FC<{ children: ReactNode }> = ({ children }) => {
  const { access, user, tenantName } = useStore();

  if (!tenantName) return <Navigate to="/auth" />;

  if (!access || !user.email) return <Navigate to="/auth/login" />;

  return children;
};

export default Protected;
