import { authGetResData, useSWR } from "@/http/api";
import { User } from "@/types/user";

export function useUser() {
  return useSWR<User>("/auth/user/profile", authGetResData);
}
