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
  userResponse?: UserResponse;
}>({
  user: undefined,
  setUser: () => {},
  loading: true,
  userResponse: undefined,
});

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userResponse, setUserResponse] = useState<UserResponse | undefined>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedUserCode = localStorage.getItem("user_code");
    if (storedUserCode && storedUserCode !== "undefined") {
      setLoading(true);
      getUserByCode(storedUserCode)
        .then((user) => {
          setUser(user);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          localStorage.removeItem("user_code");
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
    <UserContext.Provider value={{ user, setUser, loading, userResponse }}>
      {children}
    </UserContext.Provider>
  );
};
