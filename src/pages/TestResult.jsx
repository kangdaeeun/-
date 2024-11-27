import { useEffect, useState } from "react";
import TestResultList from "../components/TestResultList";
import { getTestResults } from "../api/testResults";

const TestResult = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        setLoading(true); // 로딩 시작
        const results = await getTestResults();
        setTestResults(results);
      } catch (error) {
        console.error("Error fetching test results:", error);
      } finally {
        setLoading(false); // 로딩 끝
      }
    };

    fetchTestResults();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center bg-white mt-16 p-8">
        <h1 className="text-3xl font-bold mb-8 text-primary-color">
          모든 테스트 결과
        </h1>
        {loading ? ( // 로딩 상태 표시
          <p className="text-xl text-gray-500">로딩 중...</p>
        ) : (
          <TestResultList
            testResults={testResults}
            setTestResults={setTestResults}
          />
        )}
      </div>
    </>
  );
};

export default TestResult;
