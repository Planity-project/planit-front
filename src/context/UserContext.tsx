import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import api from "@/util/api";
import BannedModal from "@/features/BannedModal";
import { useRouter } from "next/router";
interface User {
  id: number;
  email: string;
  nickname: string;
  type: string;
  profile_img: string | null;
  status?: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isSuspended: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  isSuspended: false,
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSuspended, setIsSuspended] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [banReason, setBanReason] = useState<string | undefined>(undefined);
  const [banEndDate, setBanEndDate] = useState<string | undefined>(undefined);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/auth/cookieCheck");
        const data = res.data as {
          result: boolean;
          user?: User;
          isSuspended?: boolean;
          reason?: string;
          endDate?: string;
        };

        if (data.result && data.user) {
          setUser(data.user);

          if (data.isSuspended) {
            setIsSuspended(true);
            setModalOpen(true);
            setBanReason(data.reason);
            setBanEndDate(data.endDate);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleConfirm = async () => {
    setModalOpen(false);
    try {
      await api.get("/auth/logout");
    } catch (err) {
      console.error("로그아웃 실패:", err);
    } finally {
      router.push("/");
      window.location.reload();
    }
  };

  return (
    <UserContext.Provider value={{ user, isLoading, isSuspended }}>
      <>
        {children}
        <BannedModal
          open={modalOpen}
          reason={banReason}
          endDate={banEndDate}
          onConfirm={handleConfirm}
        />
      </>
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
