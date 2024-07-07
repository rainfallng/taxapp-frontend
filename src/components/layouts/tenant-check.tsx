import { useStore } from "@/store";
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const TenantCheck = ({ children }: { children: ReactNode }) => {
  const { setTenantName, tenantName } = useStore();
  const { pathname } = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState<null | boolean>(null);

  useEffect(() => {
    const hostWrapper: Record<string, string> = {
      "localhost:5174": "lagos.taxapp.ng",
    };

    const originName = origin.replace("http://", "").replace("https://", "");

    const host = hostWrapper?.[originName] ?? originName;

    const splitHost = host.split(".");

    const tenant = splitHost.length !== 3 ? "" : splitHost[0];

    if (tenant || tenantName) {
      if (!tenantName) setTenantName(tenant);
      setShouldRedirect(false);
    } else {
      setShouldRedirect(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenantName]);

  if (shouldRedirect === null) return;

  if (shouldRedirect) return <Navigate to="/auth" state={{ pathname }} />;

  return children;
};

export default TenantCheck;
