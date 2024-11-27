import { useState } from "react";
import TestForm from "../components/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const TestPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);
    setResult(mbtiResult);

    try {
      const resultPayload = {
        userid: user.userId,
        username: user.nickname,
        mbti: mbtiResult,
        description: mbtiDescriptions[mbtiResult],
        createdAt: new Date().toISOString(),
        visibility: true, // 기본값: 공개
      };

      await createTestResult(resultPayload);
    } catch (error) {
      console.error("Error saving test result:", error);
    }
  };

  const handleNavigateToResults = () => {
    navigate("/results");
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center bg-white mt-16">
        <div className="bg-white rounded-lg p-8 max-w-xl w-full shadow-lg">
          {!result ? (
            <>
              <h1 className="flex justify-center text-3xl font-bold text-primary-color mb-6">
                MBTI 테스트
              </h1>
              <TestForm onSubmit={handleTestSubmit} />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-primary-color mb-6">
                테스트 결과: {result}
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                {mbtiDescriptions[result] ||
                  "해당 성격 유형에 대한 설명이 없습니다."}
              </p>
              <button
                onClick={handleNavigateToResults}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
              >
                결과 페이지로 이동하기
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TestPage;
