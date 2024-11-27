import AppRouter from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <ToastContainer
        position="top-center" // 알림을 화면 상단 중앙에 위치
        autoClose={3000} // 3초 후 자동 닫힘
        hideProgressBar={false} // 진행 바 표시
        newestOnTop={false} // 새 알림이 위쪽에 표시
        closeOnClick // 클릭으로 닫기 가능
        rtl={false} // 왼쪽에서 오른쪽으로 텍스트 표시
        pauseOnFocusLoss // 포커스가 벗어날 때 일시정지
        draggable // 드래그 가능
        pauseOnHover // 호버 시 일시정지
      />
    </AuthProvider>
  );
}

export default App;
