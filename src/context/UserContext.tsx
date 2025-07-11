import { User } from "@/types";
import { createContext } from "react";

export const UserContext = createContext<{
  user?: User;
}>({ user: undefined });
