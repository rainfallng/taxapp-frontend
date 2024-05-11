import { useAuth } from "@/hooks/useAuth";
import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

const Protected: FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) return <div />;

  if (!isAuthenticated) return <Navigate to="/auth/login" />

  return children;
};

export default Protected;
