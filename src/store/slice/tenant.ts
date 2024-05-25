import { StateCreator } from "zustand";

export interface ITenantSlice {
  tenantName: string;
  setTenantName: (value: string) => void;
}

export const tenantSlice: StateCreator<ITenantSlice> = (set) => ({
  tenantName: "",
  setTenantName: (value: string) => set({ tenantName: value }),
});
