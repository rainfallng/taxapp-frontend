import { ProfileLayout } from "@/components/features/profile/layout";
import AuthLayout from "@/components/layouts/auth";
import DashboardLayout from "@/components/layouts/dashboard";
import TenantCheck from "@/components/layouts/tenant-check";
import ForgotPassword from "@/pages/auth/forgot-password";
import ForgotPasswordSuccess from "@/pages/auth/forgot-password-success";
import GetStarted from "@/pages/auth/get-started";
import Login from "@/pages/auth/login";
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
import MyProfile from "@/pages/profile";
import Address from "@/pages/profile/address";
import Corporation from "@/pages/profile/corporation";
import Directors from "@/pages/profile/directors";
import GenerateTaxCertificate from "@/pages/profile/generate-tax-certificate";
import ChangePassword from "@/pages/profile/password";
import Payroll from "@/pages/profile/payroll";
import FamilyRelations from "@/pages/profile/relations";
import SupportStaff from "@/pages/profile/staff";
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
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="tax-retrieval" element={<TaxRetrieval />} />
          <Route path="verify-phone" element={<VerifyPhone />} />
          <Route path="recaptcha" element={<Recaptcha />} />
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
        <Route path="profile/generate-tax-certificate" element={<GenerateTaxCertificate />} />
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
