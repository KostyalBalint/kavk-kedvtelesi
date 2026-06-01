import { Navigate, Route, Routes } from "react-router-dom";
import BottomNav from "./components/BottomNav.jsx";
import Home from "./pages/Home.jsx";
import Quiz from "./pages/Quiz.jsx";
import Review from "./pages/Review.jsx";
import Stats from "./pages/Stats.jsx";

export default function App() {
  return (
    <div className="mx-auto flex min-h-full max-w-md flex-col bg-slate-100">
      <main className="flex-1 pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:bankId/:mode" element={<Quiz />} />
          <Route path="/review/:bankId" element={<Review />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}
