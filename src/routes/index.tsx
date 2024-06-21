import AuthLayout from "@/components/layouts/auth";
import DashboardLayout from "@/components/layouts/dashboard";
import TenantCheck from "@/components/layouts/tenant-check";
import SuccessPage from "@/pages/auth/SuccessPage";
import TermsOfUse from "@/pages/auth/TermsOfUse";
import ForgotPassword from "@/pages/auth/forgot-password";
import ForgotPasswordSuccess from "@/pages/auth/forgot-password-success";
import GetStarted from "@/pages/auth/get-started";
import Login from "@/pages/auth/login";
import CompanyIdentification from "@/pages/auth/onboarding/CompanyIdentification";
import CompanyProfile from "@/pages/auth/onboarding/CompanyProfile";
import InitialOnboarding from "@/pages/auth/onboarding/InitialOnboarding";
import Identification from "@/pages/auth/onboarding/identification";
import Personalinformation from "@/pages/auth/onboarding/personalinformation";
import Recaptcha from "@/pages/auth/recaptcha";
import Register from "@/pages/auth/register";
import TaxRetrieval from "@/pages/auth/tax-retrieval";
import TaxRetrievalSuccess from "@/pages/auth/tax-retrieval-success";
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
          <Route path="terms" element={<TermsOfUse />} />
          <Route path="successfull" element={<SuccessPage />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="tax-retrieval" element={<TaxRetrieval />} />
          <Route path="verify-phone" element={<VerifyPhone />} />
          <Route path="recaptcha" element={<Recaptcha />} />
          <Route path="onboarding" element={<Outlet />}>
            <Route path="identification" element={<Identification />} />
            <Route path="company_info" element={<CompanyIdentification />} />
            <Route path="personal" element={<Personalinformation />} />
            <Route path="company-profile" element={<CompanyProfile />} />
            <Route path="tin" element={<InitialOnboarding />} />
          </Route>
        </Route>
        <Route index path="*" element={<Navigate replace to="/auth/login" />} />
      </Route>
      <Route
        path="forgot-password-success"
        element={<ForgotPasswordSuccess />}
      />
      <Route
        path="tax-id-retrieval-success"
        element={<TaxRetrievalSuccess />}
      />
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
        <Route path="returns" element={<Outlet />}></Route>
        <Route index element={<Navigate replace to="/app/home" />} />
        <Route path="*" element={<Error404 />} />
      </Route>
      <Route index path="*" element={<Navigate replace to="/app" />} />
    </Routes>
  );
};

export default AppRoutes;
