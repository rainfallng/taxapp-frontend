import { IConsultant, IToken, IUser, UserType } from "@/types";
import { StateCreator } from "zustand";

export interface IUserSlice extends IToken {
  user: IUser;
  consultant: IConsultant;
  onboarded: Record<
    string,
    {
      cac_verified: boolean;
      id_verified: boolean;
    }
  >;
  setTaxPayerId: (value: string, type: "profile" | "company_profile") => void;
  setRefreshToken: (value: string) => void;
  setAccessToken: (value: string) => void;
  setUser: (user: Partial<IUser>) => void;
  setConsultant: (user: Partial<IConsultant>) => void;
  setOnboarded: (value: {
    [id: string]: Partial<{
      cac_verified: boolean;
      id_verified: boolean;
    }>;
  }) => void;
  setToken: (access: string, refresh: string) => void;
  reset: () => void;
}

const defaultState = {
  access: null,
  refresh: null,
  onboarded: {
    [UserType.COMPANY]: {
      cac_verified: false,
      id_verified: false,
    },
    [UserType.INDIVIDUAL]: {
      cac_verified: false,
      id_verified: false,
    },
    [UserType.TAX_CONSULTANT]: {
      cac_verified: false,
      id_verified: false,
    },
  },
  user: {} as IUser,
  consultant: {} as IConsultant,
};

export const userSlice: StateCreator<IUserSlice> = (set) => ({
  ...defaultState,
  setRefreshToken: (value) => set({ refresh: value }),
  setAccessToken: (value) => set({ access: value }),
  setToken: (access, refresh) => set({ access, refresh }),
  setTaxPayerId: (value, type) => {
    set((s) => ({
      ...s,
      user: { ...s.user, [type]: { ...s.user[type], tax_payer_id: value } },
    }));
  },
  setUser: (value) =>
    set((s) => ({ ...s, user: { ...s.user, ...(value as IUser) } })),
  setConsultant: (value) =>
    set((s) => ({
      ...s,
      consultant: { ...s.consultant, ...(value as IConsultant) },
    })),
  setOnboarded: (value) =>
    set((s) => ({
      ...s,
      onboarded: {
        ...s.onboarded,
        [Object.keys(value)[0]]: {
          ...s.onboarded[Object.keys(value)[0]],
          ...value[Object.keys(value)[0]],
        },
      },
    })),
  reset: () => set((s) => ({ ...s, ...defaultState })),
});
