import { getResponseByUserId, getUserByCode } from "@/api_calls";
import { User, UserResponse } from "@/types";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export const UserContext = createContext<{
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  loading: boolean;
  userError: string;
  userResponse?: UserResponse;
}>({
  user: undefined,
  setUser: () => {},
  loading: true,
  userError: "",
  userResponse: undefined,
});

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userResponse, setUserResponse] = useState<UserResponse | undefined>();
  const [loading, setLoading] = useState(true);
  const [userError, setUserError] = useState("");
  useEffect(() => {
    const storedUserCode = localStorage.getItem("user_code");
    if (storedUserCode && storedUserCode !== "undefined") {
      setLoading(true);
      getUserByCode(storedUserCode)
        .then((user) => {
          setUser(user);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          setUserError(e.message);
        });
    } else {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (user && user.code) {
      localStorage.setItem("user_code", user?.code);
      getResponseByUserId(user.user_id).then((response) => {
        console.log(response);
        setUserResponse(response);
      });
    }
  }, [user]);
  return (
    <UserContext.Provider
      value={{ user, setUser, loading, userError, userResponse }}
    >
      {children}
    </UserContext.Provider>
  );
};
