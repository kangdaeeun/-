import API from "./api";

// 회원가입
export const register = async (userid, password, nickname) => {
  try {
    // 서버로 회원가입 데이터 전송
    const response = await API.post("/register", {
      id: userid,
      password,
      nickname,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Registration failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// 로그인
export const login = async (userid, password) => {
  try {
    // 서버에 로그인 요청
    const response = await API.post("/login", {
      id: userid,
      password,
    });

    // 서버 응답에서 데이터 가져오기
    const { accessToken, userId, nickname } = response.data;

    // 로컬 스토리지에 사용자 데이터와 토큰 저장
    localStorage.setItem("user", JSON.stringify({ userId, nickname }));
    localStorage.setItem("token", accessToken);

    // 사용자 데이터 반환
    return { userId, nickname, token: accessToken };
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

// 프로필 정보 조회
export const getProfile = async () => {
  try {
    const response = await API.get("/user");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error.response.data);
    throw error;
  }
};

// 프로필 정보 업데이트
export const updateProfile = async (nickname) => {
  try {
    // FormData 생성
    const formData = new FormData();
    formData.set("nickname", nickname); // 닉네임 설정

    // PATCH 요청
    const response = await API.patch("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // multipart 설정
      },
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error(
      "Failed to update profile:",
      error.response?.data || error.message
    );
    throw error;
  }
};
