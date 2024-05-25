import { getLS, removeLS, setLS } from "@/lib/utils";

export const storage = {
  getItem: getLS,
  setItem: setLS,
  removeItem: removeLS,
};
