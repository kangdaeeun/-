import { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin } from "../api/auth";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // 로그인 함수
  const login = async (userid, password) => {
    try {
      const { userId, nickname, token } = await apiLogin(userid, password);

      // 상태 업데이트
      setIsLoggedIn(true);
      setUser({ userId, nickname });

      return { userId, nickname, token }; // 필요 시 반환
    } catch (error) {
      console.error("Login failed in AuthContext:", error);
      throw error;
    }
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("로그아웃이 완료되었습니다.");
    setIsLoggedIn(false);
    setUser(null);
  };

  // 초기 사용자 상태 설정
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
