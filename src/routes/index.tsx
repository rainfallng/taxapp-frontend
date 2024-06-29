import { ProfileLayout } from "@/components/features/profile/layout";
import AuthLayout from "@/components/layouts/auth";
import DashboardLayout from "@/components/layouts/dashboard";
import TenantCheck from "@/components/layouts/tenant-check";
import OnboardingSuccess from "@/pages/auth/success";
import TermsOfUse from "@/pages/auth/terms-of-use";
import ForgotPassword from "@/pages/auth/forgot-password";
import ForgotPasswordSuccess from "@/pages/auth/forgot-password-success";
import GetStarted from "@/pages/auth/get-started";
import Login from "@/pages/auth/login";
import CompanyIdentification from "@/pages/auth/onboarding/company-identification";
import CompanyProfile from "@/pages/auth/onboarding/company-profile";
import InitialOnboarding from "@/pages/auth/onboarding/initial-onboarding";
import Identification from "@/pages/auth/onboarding/identification";
import Personalinformation from "@/pages/auth/onboarding/personal-information";
import Recaptcha from "@/pages/auth/recaptcha";
import Register from "@/pages/auth/register";
import TaxRetrieval from "@/pages/auth/tax-retrieval";
import TaxRetrievalSuccess from "@/pages/auth/tax-retrieval-success";
import VerifyPhone from "@/pages/auth/verify-phone";
import Error404 from "@/pages/error/404";
import DashboardHome from "@/pages/home";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import QuickMenu from "@/pages/quick-menu";
import VerifyTIN from "@/pages/auth/onboarding/verify-tin";
import MyProfile from "@/pages/profile";
import Address from "@/pages/profile/address";
import Corporation from "@/pages/profile/corporation";
import Directors from "@/pages/profile/directors";
import GenerateTaxCertificate from "@/pages/profile/generate-tax-certificate";
import ChangePassword from "@/pages/profile/password";
import Payroll from "@/pages/profile/payroll";
import FamilyRelations from "@/pages/profile/relations";
import SupportStaff from "@/pages/profile/staff";
import FileReturns from "@/pages/returns";
import AnnualReturn from "@/pages/returns/annual";
import FilingHistory from "@/pages/returns/filing-history";

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
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="tax-retrieval" element={<TaxRetrieval />} />
          <Route path="verify-phone" element={<VerifyPhone />} />
          <Route path="recaptcha" element={<Recaptcha />} />
          <Route path="onboarding" element={<Outlet />}>
            <Route path="identification" element={<Identification />} />
            <Route path="company-info" element={<CompanyIdentification />} />
            <Route path="personal-info" element={<Personalinformation />} />
            <Route path="company-profile" element={<CompanyProfile />} />
            <Route path="tin" element={<Outlet />}>
              <Route index element={<InitialOnboarding />} />
              <Route path="verify" element={<VerifyTIN />} />
            </Route>
            <Route path="success" element={<OnboardingSuccess />} />
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
        <Route path="quick-menu" element={<QuickMenu />} />
        <Route
          path="profile/generate-tax-certificate"
          element={<GenerateTaxCertificate />}
        />
        <Route
          path="profile"
          element={
            <ProfileLayout>
              <Outlet />
            </ProfileLayout>
          }
        >
          <Route index element={<MyProfile />} />
          <Route path="relations" element={<FamilyRelations />} />
          <Route path="staff" element={<SupportStaff />} />
          <Route path="directors" element={<Directors />} />
          <Route path="corporation" element={<Corporation />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="password" element={<ChangePassword />} />
          <Route path="address" element={<Address />} />
        </Route>
        <Route path="returns" element={<Outlet />}>
          <Route index element={<FileReturns />} />
          <Route path="annual" element={<AnnualReturn />} />
          <Route path="history" element={<FilingHistory />} />
        </Route>
        <Route index element={<Navigate replace to="/app/quick-menu" />} />
        <Route path="*" element={<Error404 />} />
      </Route>
      <Route index path="*" element={<Navigate replace to="/app" />} />
    </Routes>
  );
};

export default AppRoutes;
