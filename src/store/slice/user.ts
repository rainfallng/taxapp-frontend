import { IToken, IUser } from "@/types";
import { StateCreator } from "zustand";

export interface IUserSlice extends IToken {
  user: IUser;
  setRefreshToken: (value: string) => void;
  setAccessToken: (value: string) => void;
  setUser: (user: Partial<IUser>) => void;
  setToken: (access: string, refresh: string) => void;
}

export const userSlice: StateCreator<IUserSlice> = (set) => ({
  access: null,
  refresh: null,
  user: {
    pk: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    user_type: "",
  },
  setRefreshToken: (value) => set({ refresh: value }),
  setAccessToken: (value) => set({ access: value }),
  setToken: (access, refresh) => set({ access, refresh }),
  setUser: (value) => set((s) => ({ ...s, user: { ...s.user, ...value } })),
});
