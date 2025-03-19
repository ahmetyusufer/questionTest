import { useRef, useEffect } from "react";
import { useQuizContext } from "../contexts/QuizContext";
import Spinner from "./Spinner";
import LeaderboardTable from "./LeaderboardTable";
import { useLeaderboardData } from "../hooks/useLeaderboardData";
import { useBeforeUnloadSave } from "../hooks/useBeforeUnloadSave";

function Finish() {
  // Veritabanına veri kaydederken yinelemeyi önlemek için useRef kullanıyoruz
  const { quizStatus, name, score } = useQuizContext();
  const { data, isLoading, error, mutate } = useLeaderboardData();

  // Kaydın yapılmadığını kontrol et
  const hasSubmitted = useRef(localStorage.getItem("hasSubmitted") === "false");

  // Quiz bittiğinde veri kaydetme
  useEffect(() => {
    if (quizStatus === "finish" && !hasSubmitted.current && name !== "") {
      mutate({ name, score });
      hasSubmitted.current = true;
      localStorage.setItem("hasSubmitted", "true"); // Kaydın yapıldığını işaretle
    }
  }, [quizStatus, mutate, name, score]);

  // Sayfa kapanırken veya yenilenirken veri kaydetme işlemi
  useBeforeUnloadSave();

  // UI render koşulları
  if (isLoading)
    return (
      <div className="leaderboard-container">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="leaderboard-container">
        Something Went Wrong: {error.message}
      </div>
    );

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Liderlik Tablosu</h1>
      <LeaderboardTable data={data} />
    </div>
  );
}

export default Finish;
