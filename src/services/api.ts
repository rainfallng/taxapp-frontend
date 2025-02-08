import axios, { AxiosInstance } from "axios";
import { getStore, onDownloadBlob } from "@/lib/utils";
import {
  AddCompanyStaffReturn,
  AnnualReturnList,
  AnnualReturnType,
  BillList,
  CompanyReturnsList,
  ICompanyOnboarding,
  IConsultant,
  IConsultantVerifyIdentity,
  IIndividualAnnualAccomodationInput,
  IIndividualAnnualIncome,
  IIndividualOnboardingInput,
  IIndividualOnboarding as IIndividualProfileOnboarding,
  IIndividualReturn,
  ILGAs,
  ILogin,
  IPaginatedResponse,
  IRegister,
  IResetPassword,
  IState,
  IUser,
  IVerifyCAC,
  Nationality,
  ProjectionReturnList,
  ProjectionReturnType,
  ReturnGraph,
  ReturnStat,
  ScheduleReturnList,
  ScheduleReturnTaxType,
  WitholdingTaxList,
  WitholdingTaxType,
  YearOrMonthParam,
} from "@/types";

export class APIRequest {
  private endpoint?: string;
  private accessToken: string;
  private instance: AxiosInstance;

  constructor(tenant: string, endpoint?: string) {
    const api = (
      import.meta.env.DEV
        ? import.meta.env.VITE_API
        : import.meta.env.VITE_PROD_API
    ) as string;
    this.endpoint = endpoint ?? api;
    const t = getStore() as { access?: string };

    this.accessToken = t?.access ?? "";

    this.instance = axios.create({
      baseURL: this.endpoint,
    });

    axios.defaults.baseURL = `${this.endpoint}/tenant/${tenant}`;
  }

  getAllTenants = async () => {
    const { data } = await this.instance.get("/tenants/all");

    return data;
  };

  register = async (body: IRegister) => {
    const { data } = await axios.post(`/register/`, body);

    return data;
  };

  login = async (body: ILogin) => {
    const { data } = await axios.post(`/login/`, body);

    return data as { refresh: string; access: string; user: IUser };
  };

  resetPassword = async (body: IResetPassword) => {
    const { data } = await axios.post(
      `/api/v1/ums/profile/reset-password/`,
      body
    );

    return data;
  };

  sendAuthOtp = async () => {
    const { data } = await axios.get(`/api/v1/ums/profile/send_otp/`, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data;
  };

  verifyAuthOtp = async (body: { token: string }) => {
    const { data } = await axios.post(`/api/v1/ums/profile/verify_otp/`, body, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data;
  };

  getAuthUser = async () => {
    const { data } = await axios.get(`/api/v1/ums/profile/me`, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data;
  };

  getStates = async () => {
    const { data } = await axios.get(`/api/v1/location/countries/nigeria/states/`, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data as IState[];
  };

  getLGAs = async (stateId: number) => {
    const { data } = await axios.get(
      `/api/v1/location/countries/${stateId}/lgas/`,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data as ILGAs[];
  };

  completeIndividualOnboarding = async (
    body: Partial<IIndividualProfileOnboarding>
  ) => {
    const { data } = await axios.post(`/api/v1/tin/profile/individual/`, body, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data;
  };

  completeCompanyOnboarding = async (body: Partial<ICompanyOnboarding>) => {
    const { data } = await axios.post(`/api/v1/tin/profile/company/`, body, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data;
  };

  individualIdentification = async (body: IIndividualOnboardingInput) => {
    const { data } = await axios.post(`/api/v1/tin/individual/verify/`, body, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data;
  };

  profileIdentification = async (
    body: Omit<IIndividualOnboardingInput, "date_of_birth">
  ) => {
    const { data } = await axios.post(
      `/api/v1/ums/profile/verify-identity/`,
      body,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  updateTaxPayerId = async (
    body: { tax_payer_id: string }
  ) => {
    const { data } = await axios.patch(
      `/api/v1/ums/profile/update/tax-payer-id/`,
      body,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  verifyProfileIdentification = async (
    body: Omit<IIndividualOnboardingInput, "date_of_birth"> & { otp: string }
  ) => {
    const { data } = await axios.post(
      `/api/v1/ums/profile/verify-identity/confirm-otp/`,
      body,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data as { data: IConsultantVerifyIdentity | IUser };
  };

  consultantIdentification = async (
    body: Omit<IIndividualOnboardingInput, "date_of_birth">
  ) => {
    const { data } = await axios.post(
      `/api/v1/ums/tax-consultant/request/verify-identity/`,
      body
    );

    return data;
  };

  verifyConsultantIdentification = async (
    body: Omit<IIndividualOnboardingInput, "date_of_birth"> & { otp: string }
  ) => {
    const { data } = await axios.post(
      `/api/v1/ums/tax-consultant/request/verify-identity/otp/`,
      body
    );

    return data as { data: IConsultantVerifyIdentity };
  };

  consultantRequest = async (body: FormData) => {
    const { data } = await axios.post(
      `/api/v1/ums/tax-consultant/request/`,
      body
    );

    return data;
  };

  consultantSignup = async (body: FormData) => {
    const { data } = await axios.patch(
      `/api/v1/ums/tax-consultant/complete-signup/`,
      body,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  getProfile = async () => {
    const { data } = await axios.get(`/api/v1/ums/profile/me/`, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data as IUser;
  };

  updateIndividual = async (body: Partial<IIndividualProfileOnboarding>) => {
    const { data } = await axios.patch(`/api/v1/ums/profile/me/update/`, body, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data;
  };

  updateCompany = async (body: Partial<ICompanyOnboarding>) => {
    const { data } = await axios.patch(
      `/api/v1/ums/profile/me/update-company/`,
      body,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  verifyTIN = async (tin: string) => {
    const { data } = await axios.post(
      `/api/v1/tin/individual/verify-tin/`,
      { tin },
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  confirmOTP = async (body: { tin: string; otp: string }) => {
    const { data } = await axios.post(
      `/api/v1/tin/individual/confirm-otp/`,
      body,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  verifyCompanyTIN = async (tin: string) => {
    const { data } = await axios.post(
      `/api/v1/tin/company/verify-tin/`,
      { tin },
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  confirmCompanyOTP = async (body: { tin: string; otp: string }) => {
    const { data } = await axios.post(
      `/api/v1/tin/company/confirm-tin-otp/`,
      body,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  verifyCAC = async (body: IVerifyCAC) => {
    const { data } = await axios.post(`/api/v1/tin/company/verify/`, body, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data;
  };

  confirmCAC = async (body: IVerifyCAC & { otp: string }) => {
    const { data } = await axios.post(
      `/api/v1/tin/company/confirm-otp/`,
      body,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  getIndividualReturnYears = async () => {
    const { data } = await axios.get(
      `/api/v1/returns/individual/individual/years/`,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data as { data: number[] };
  };

  postIndividualReturns = async (body: IIndividualReturn) => {
    const { data } = await axios.post(`/api/v1/returns/individual/`, body, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data;
  };

  postIndividualIncome = async (body: IIndividualAnnualIncome) => {
    const { statement_of_income, ...rest } = body;
    console.log(statement_of_income);
    const { data } = await axios.post(
      `/api/v1/returns/individual/income/`,
      rest,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  postIndividualAccomodation = async (
    incomeId: string,
    body: IIndividualAnnualAccomodationInput
  ) => {
    const { data } = await axios.post(
      `/api/v1/returns/individual/${incomeId}/accommodation/`,
      body,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  getBillInvoice = async (billId: string) => {
    const { data } = await axios.get(`/api/v1/invoices/bills/${billId}/`, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data;
  };

  getIndividualBillList = async () => {
    const { data } = await axios.get(`/api/v1/invoices/bills/`, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data as BillList;
  };

  getCompanyReturns = async (params?: { year: string }) => {
    const { data } = await axios.get(`/api/v1/returns/company/`, {
      params,
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data as CompanyReturnsList;
  };

  postCompanyPayeeReturns = async (
    variables: {
      year: string;
      month: string;
    } & AddCompanyStaffReturn
  ) => {
    const { data } = await axios.post(
      `/api/v1/returns/company/monthly-returns/monthly-payee/`,
      variables,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  getCompanyStaffTemplate = async () => {
    const { data } = await axios.get(
      `/api/v1/returns/company/staff/template/`,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  uploadCompanyPayeReturns = async (variables: FormData) => {
    const { data } = await axios.post(
      `/api/v1/returns/company/monthly-returns/monthly-payee/`,
      variables,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  uploadCompanyAnnualReturns = async (variables: FormData) => {
    const { data } = await axios.post(
      `/api/v1/returns/company/annual-returns/annual-returns/upload/`,
      variables,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  uploadCompanyProjectionReturns = async (variables: FormData) => {
    const { data } = await axios.post(
      `/api/v1/returns/company/annual-returns/projection-returns/upload/`,
      variables,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  initiatePayment = async (billId: number) => {
    const { data } = await axios.post(
      `/api/v1/invoices/payments/initiate/`,
      { bill: billId },
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  getCompanyReturnsGraph = async (params?: YearOrMonthParam) => {
    const { data } = await axios.get(
      "/api/v1/dashboard/company/returns/graph/",
      {
        params,
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data as ReturnGraph[];
  };

  getCompanyReturnsStat = async (params?: YearOrMonthParam) => {
    const { data } = await axios.get(
      "/api/v1/dashboard/company/returns/stat/",
      {
        params,
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data as ReturnStat;
  };

  inviteConsultant = async (body: { email: string; phone: string }) => {
    const { data } = await axios.post(
      `/api/v1/ums/tax-consultant/invite/`,
      body,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  getConsultants = async () => {
    const { data } = await axios.get(`/api/v1/ums/tax-consultant/`, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data as IPaginatedResponse<IConsultant>;
  };

  getCountries = async () => {
    const { data } = await axios.get(`/api/v1/location/countries/`, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data as Nationality[];
  };

  downloadMonthlyPayeTemplate = async (filename: string) => {
    return this.downloadTemplate(
      `/api/v1/returns/company/monthly-returns/monthly-payee/template/`,
      filename
    );
  };

  downloadAnnualReturnTemplate = async (filename: string) => {
    return this.downloadTemplate(
      `/api/v1/returns/company/annual-returns/annual-returns/template/`,
      filename
    );
  };

  downloadProjectionReturnTemplate = async (filename: string) => {
    return this.downloadTemplate(
      `/api/v1/returns/company/annual-returns/projection-returns/template/`,
      filename
    );
  };

  downloadTemplate = async (endpoint: string, filename: string) => {
    const response = await axios.get(endpoint, {
      responseType: "blob",
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    onDownloadBlob(response.data, filename);

    return response.data;
  };

  postCompanyAnnualReturns = async (
    variables: AnnualReturnType & {
      year: number;
    }
  ) => {
    const { data } = await axios.post(
      `/api/v1/returns/company/annual-returns/annual-returns/`,
      variables,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  postCompanyProjectionReturns = async (
    variables: ProjectionReturnType & {
      year: number;
    }
  ) => {
    const { data } = await axios.post(
      `/api/v1/returns/company/annual-returns/projection-returns/`,
      variables,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  postCompanyWitholdingTax = async (
    variables: WitholdingTaxType & {
      year: number;
    }
  ) => {
    const { data } = await axios.post(
      `/api/v1/returns/company/annual-returns/witholding-tax/`,
      variables,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  postCompanyScheduleReturns = async (
    variables: ScheduleReturnTaxType & {
      year: number;
    }
  ) => {
    const { data } = await axios.post(
      `/api/v1/returns/company/annual-returns/schedule-returns/`,
      variables,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data;
  };

  getAnnualReturns = async () => {
    const { data } = await axios.get(
      `/api/v1/returns/company/annual-returns/annual-returns/`,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data as AnnualReturnList;
  };

  getProjectionReturns = async () => {
    const { data } = await axios.get(
      `/api/v1/returns/company/annual-returns/projection-returns/`,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data as ProjectionReturnList;
  };

  getScheduleReturns = async () => {
    const { data } = await axios.get(
      `/api/v1/returns/company/annual-returns/schedule-returns/`,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data as ScheduleReturnList;
  };

  getWitholdingTax = async () => {
    const { data } = await axios.get(
      `/api/v1/returns/company/annual-returns/witholding-tax/`,
      {
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data as WitholdingTaxList;
  };

  getMonthlyReturns = async (params?: { year: string }) => {
    const { data } = await axios.get(
      `/api/v1/returns/company/monthly-returns/`,
      {
        params,
        headers: {
          Authorization: `JWT ${this.accessToken}`,
        },
      }
    );

    return data as CompanyReturnsList;
  };
}
