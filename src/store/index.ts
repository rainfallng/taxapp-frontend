import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storage } from "./storage";
import { ITenantSlice, tenantSlice } from "./slice/tenant";
import { IUserSlice, userSlice } from "./slice/user";

export type SliceType = ITenantSlice & IUserSlice;

export const STORAGE_NAME = "taskapp"

export const useStore = create<SliceType>()(
  persist(
    (...a) => ({
      ...tenantSlice(...a),
      ...userSlice(...a),
    }),
    {
      name: STORAGE_NAME,
      storage,
    }
  )
);