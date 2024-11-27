import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { register } from "../api/auth"; // 회원가입 API
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      await register(formData.userid, formData.password, formData.nickname);
      toast.success("회원가입 성공! 로그인 해주세요.");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error.response?.data || error.message);
      toast.error("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            회원가입
          </h1>
          <AuthForm mode="signup" onSubmit={handleSignup} />
          <p className="text-center text-sm text-gray-500 mt-4">
            이미 계정이 있으신가요?{" "}
            <Link
              to="/login"
              className="text-red-500 font-bold hover:underline"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
