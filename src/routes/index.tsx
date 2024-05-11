import AuthLayout from "@/components/layouts/auth";
import DashboardLayout from "@/components/layouts/dashboard";
import Login from "@/pages/auth/login";
import Recaptcha from "@/pages/auth/recaptcha";
import Register from "@/pages/auth/register";
import VerifyPhone from "@/pages/auth/verify-phone";
import Error404 from "@/pages/error/404";
import DashboardHome from "@/pages/home";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verify-phone" element={<VerifyPhone />} />
        <Route path="recaptcha" element={<Recaptcha />} />
        <Route index path="*" element={<Navigate replace to="/auth/login" />} />
      </Route>
      <Route path="app" element={<DashboardLayout />}>
        <Route path="home" element={<DashboardHome />} />
        <Route path="professionals" element={<Outlet />}>
        </Route>
        <Route index element={<Navigate replace to="/app/home" />} />
        <Route path="*" element={<Error404 />} />
      </Route>
      <Route index path="*" element={<Navigate replace to="/app" />} />
    </Routes>
  );
};

export default AppRoutes;
