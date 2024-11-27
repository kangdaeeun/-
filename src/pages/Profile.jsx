import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getProfile, updateProfile } from "../api/auth";

const Profile = () => {
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);

  // 초기 데이터 로드
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile(); // getProfile 함수 호출
        setNickname(profile.nickname); // 닉네임 설정
      } catch (error) {
        console.error("Failed to load profile:", error);
        toast.error("프로필 정보를 불러오지 못했습니다.");
      }
    };
    fetchProfile();
  }, []);

  // 닉네임 업데이트 함수
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true); // 로딩 상태 활성화

    try {
      const user = JSON.parse(localStorage.getItem("user")); // 사용자 정보 가져오기
      if (!user) {
        toast.error("로그인이 필요합니다.");
        return;
      }

      // 닉네임 업데이트
      const updatedProfile = await updateProfile(nickname);

      // 로컬 스토리지 사용자 정보 업데이트
      const updatedUser = { ...user, nickname: updatedProfile.nickname };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("프로필이 성공적으로 업데이트되었습니다!");
    } catch (error) {
      console.error(
        "프로필 업데이트 실패:",
        error.response?.data || error.message
      );
      toast.error("프로필 업데이트에 실패했습니다.");
    } finally {
      setLoading(false); // 로딩 상태 비활성화
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            프로필 수정
          </h2>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label
                htmlFor="nickname"
                className="block text-gray-700 font-medium mb-2"
              >
                닉네임
              </label>
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-md font-bold hover:bg-red-600 transition"
              disabled={loading}
            >
              {loading ? "업데이트 중..." : "프로필 업데이트"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
