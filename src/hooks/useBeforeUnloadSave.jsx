import { useEffect } from "react";
import { useQuizContext } from "../contexts/QuizContext";
import { createLeadered } from "../services/apiLeaderedTable";

export function useBeforeUnloadSave() {
  const { name, quizStatus, score } = useQuizContext();

  // Sayfa yenilendiğinde kaydetme işlemi
  useEffect(() => {
    const handleBeforeUnload = async () => {
      // localStorage'da kaydın yapılmadığını kontrol et
      if (
        name &&
        quizStatus === "finish" &&
        !localStorage.getItem("hasSubmitted")
      ) {
        try {
          // Kaydetme işlemi
          await createLeadered({ name, score });
          localStorage.setItem("hasSubmitted", "true"); // Kaydın yapıldığını işaretle
        } catch (error) {
          console.error("Veri kaydedilirken hata oluştu:", error);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [name, score, quizStatus]);
}
