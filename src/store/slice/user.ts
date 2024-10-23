import { IToken, IUser, UserType } from "@/types";
import { StateCreator } from "zustand";

export interface IUserSlice extends IToken {
  user: IUser;
  onboarded: Record<
    string,
    {
      cac_verified: boolean;
      id_verified: boolean;
    }
  >;
  setRefreshToken: (value: string) => void;
  setAccessToken: (value: string) => void;
  setUser: (user: Partial<IUser>) => void;
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
  user: {
    id: "",
    pk: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    user_type: "",
    tin_profile: null,
    consultant: null,
  },
};

export const userSlice: StateCreator<IUserSlice> = (set) => ({
  ...defaultState,
  setRefreshToken: (value) => set({ refresh: value }),
  setAccessToken: (value) => set({ access: value }),
  setToken: (access, refresh) => set({ access, refresh }),
  setUser: (value) => set((s) => ({ ...s, user: { ...s.user, ...value } })),
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
