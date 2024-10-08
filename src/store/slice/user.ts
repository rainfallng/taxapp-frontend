import { IToken, IUser } from "@/types";
import { StateCreator } from "zustand";

export interface IUserSlice extends IToken {
  user: IUser;
  onboarded: {
    Company: {
      cac_verified: boolean;
      id_verified: boolean;
    };
    Individual: {
      cac_verified: boolean;
      id_verified: boolean;
    };
  };
  setRefreshToken: (value: string) => void;
  setAccessToken: (value: string) => void;
  setUser: (user: Partial<IUser>) => void;
  setToken: (access: string, refresh: string) => void;
  reset: () => void;
}

const defaultState = {
  access: null,
  refresh: null,
  onboarded: {
    Company: {
      cac_verified: false,
      id_verified: false,
    },
    Individual: {
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
  },
};

export const userSlice: StateCreator<IUserSlice> = (set) => ({
  ...defaultState,
  setRefreshToken: (value) => set({ refresh: value }),
  setAccessToken: (value) => set({ access: value }),
  setToken: (access, refresh) => set({ access, refresh }),
  setUser: (value) => set((s) => ({ ...s, user: { ...s.user, ...value } })),
  reset: () => set((s) => ({ ...s, ...defaultState })),
});
