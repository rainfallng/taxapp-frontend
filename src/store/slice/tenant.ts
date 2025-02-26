import { StateCreator } from "zustand";

type TenantData = { acronym: string; title: string }

export interface ITenantSlice {
  tenantName: string;
  tenants: Record<string, TenantData>;
  tenant: TenantData;
  setTenantName: (value: string) => void;
  reset: () => void;
}

export const tenantSlice: StateCreator<ITenantSlice> = (set, get) => ({
  tenantName: "",
  tenants: {
    lagos: { acronym: "LIRS", title: "Lagos State Internal Revenue Service" },
    fct: { acronym: "FCT- IRS", title: "FCT Internal Revenue Service" }
  },
  tenant: get().tenants[get().tenantName],
  setTenantName: (value: string) => set({ tenantName: value }),
  reset: () => set((s) => ({ ...s, tenantName: "" })),
});
