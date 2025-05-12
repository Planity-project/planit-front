// context/UserContext.tsx
// import { useUser } from "@/context/UserContext"; // useUser 로그인 데이터
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import api from "@/util/api";

interface User {
  id: number;
  email: string;
  nickname: string;
  type: string;
  profile_img: string | null;
}

const UserContext = createContext<User | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api
      .get("/auth/cookieCheck")
      .then((res) => {
        console.log(res.data, "테스트 정보");
        if (res.data.result) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
