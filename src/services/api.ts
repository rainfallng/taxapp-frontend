import { getStore } from "@/lib/utils";
import {
  ICompanyOnboarding,
  IIndividualOnboarding as OldIIndividualOnboarding,
  ILGAs,
  ILogin,
  IRegister,
  IState,
} from "@/types";
import { IIndividualOnboarding, IVerifyCAC } from "@/types/form";
import axios, { AxiosInstance } from "axios";

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
    const { data } = await axios.get(`/api/v1/tin/state`, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data as IState[];
  };

  getLGAs = async (stateId: number) => {
    const { data } = await axios.get(`/api/v1/tin/state/${stateId}/lgas/`, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data as ILGAs[];
  };

  completeIndividualOnboarding = async (
    body: Partial<OldIIndividualOnboarding>
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

  individualIdentification = async (body: IIndividualOnboarding) => {
    const { data } = await axios.post(`/api/v1/tin/individual/verify/`, body, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data;
  };

  getCompany = async (id: string) => {
    const { data } = await axios.get(`/api/v1/tin/profile/company/${id}/`, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data;
  };
  
  getIndividual = async () => {
    const { data } = await axios.get(`/api/v1/tin/individual/profile/`, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data;
  };

  updateIndividual = async (body: Partial<IIndividualOnboarding>) => {
    const { data } = await axios.patch(`/api/v1/tin/individual/profile/`, body, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data;
  };

  updateCompany = async (body: Partial<ICompanyOnboarding>) => {
    const { data } = await axios.patch(`/api/v1/tin/company/profile/`, body, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

    return data;
  };

  verifyTIN = async (tin: string) => {
    const { data } = await axios.post(`/api/v1/tin/individual/verify-tin/`, { tin }, {
      headers: {
        Authorization: `JWT ${this.accessToken}`,
      },
    });

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
}
