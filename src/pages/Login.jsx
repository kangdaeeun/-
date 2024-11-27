import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // AuthContext의 login 함수 사용

  const handleLogin = async (formData) => {
    try {
      const { nickname } = await login(formData.userid, formData.password); // AuthContext의 login 호출
      toast.success(`${nickname}님, 환영합니다!`);
      navigate("/"); // 로그인 후 홈으로 이동
    } catch (error) {
      console.error("로그인 실패:", error.response?.data || error.message);
      toast.error("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          로그인
        </h1>
        <AuthForm mode="login" onSubmit={handleLogin} />
        <p className="text-center text-sm text-gray-500 mt-4">
          계정이 없으신가요?{" "}
          <Link to="/signup" className="text-red-500 font-bold hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
