import AuthLayout from "@/components/layouts/auth";
import DashboardLayout from "@/components/layouts/dashboard";
import TenantCheck from "@/components/layouts/tenant-check";
import GetStarted from "@/pages/auth/get-started";
import Login from "@/pages/auth/login";
import Recaptcha from "@/pages/auth/recaptcha";
import Register from "@/pages/auth/register";
import VerifyPhone from "@/pages/auth/verify-phone";
import Error404 from "@/pages/error/404";
import DashboardHome from "@/pages/home";
import OnboardingInitial from "@/pages/onboarding";
import CompanyInfo from "@/pages/onboarding/company-info";
import ContactInfo from "@/pages/onboarding/contact-info";
import EmploymentDetails from "@/pages/onboarding/employment-details";
import PersonalInfo from "@/pages/onboarding/personal-info";
import Success from "@/pages/onboarding/success";
import TaxHistory from "@/pages/onboarding/tax-history";
import TaxIdentification from "@/pages/onboarding/tax-identification";
import VerifyTIN from "@/pages/onboarding/verify-tin";
import VerifyTINCode from "@/pages/onboarding/verify-tin-code";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="auth" element={<AuthLayout />}>
        <Route index element={<GetStarted />} />
        <Route
          element={
            <TenantCheck>
              <Outlet />
            </TenantCheck>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-phone" element={<VerifyPhone />} />
          <Route path="recaptcha" element={<Recaptcha />} />
        </Route>
        <Route index path="*" element={<Navigate replace to="/auth/login" />} />
      </Route>
      <Route
        path="app"
        element={
          <TenantCheck>
            <DashboardLayout />
          </TenantCheck>
        }
      >
        <Route path="home" element={<DashboardHome />} />
        <Route path="onboarding" element={<Outlet />}>
          <Route index element={<OnboardingInitial />} />
          <Route path="verify-tin" element={<VerifyTIN />} />
          <Route path="verify-tin-code" element={<VerifyTINCode />} />
          <Route path="personal-info" element={<PersonalInfo />} />
          <Route path="company-info" element={<CompanyInfo />} />
          <Route path="contact-info" element={<ContactInfo />} />
          <Route path="tax-identification" element={<TaxIdentification />} />
          <Route path="tax-history" element={<TaxHistory />} />
          <Route path="employment-details" element={<EmploymentDetails />} />
          <Route path="success" element={<Success />} />
        </Route>
        <Route path="professionals" element={<Outlet />}></Route>
        <Route index element={<Navigate replace to="/app/home" />} />
        <Route path="*" element={<Error404 />} />
      </Route>
      <Route index path="*" element={<Navigate replace to="/app" />} />
    </Routes>
  );
};

export default AppRoutes;
