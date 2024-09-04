import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storage } from "./storage";
import { ITenantSlice, tenantSlice } from "./slice/tenant";
import { IUserSlice, userSlice } from "./slice/user";
import { IOnboardingSlice, onboardingSlice } from "./slice/onboarding";

export type SliceType = ITenantSlice & IUserSlice & IOnboardingSlice;

export const STORAGE_NAME = "taskapp"

export const useStore = create<SliceType>()(
  persist(
    (...a) => ({
      ...tenantSlice(...a),
      ...userSlice(...a),
      ...onboardingSlice(...a),
      reset: () => {
        tenantSlice(...a).reset();
        userSlice(...a).reset();
        onboardingSlice(...a).reset();
      }
    }),
    {
      name: STORAGE_NAME,
      storage,
    }
  )
);