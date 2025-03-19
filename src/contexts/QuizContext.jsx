import { createContext, useContext, useEffect, useReducer } from "react";
import { createLeadered } from "../services/apiLeaderedTable";

const QuizContext = createContext();

function QuizContextProvider({ children }) {
  const initialState = {
    quizStatus: "welcome", //  | start | loading | dataRecevied | x | error | reset | loading |
    questions: [],
    currentIndex: 0,
    answer: null,
    timerRemaining: 0,
    name: "",
    score: 0,
    hasVisited: localStorage.getItem("hasVisited") === "true",
  };

  const SECS_PER_QUEST = 10;

  function reducer(state, action) {
    switch (action.type) {
      case "start":
        return {
          ...state,
          quizStatus: "start",
          timerRemaining: state.questions.length * SECS_PER_QUEST,
        };
      case "dataRecevied":
        return { ...state, quizStatus: "welcome", questions: action.payload };
      case "newAnswer":
        const question = state.questions.at(state.currentIndex);
        return {
          ...state,
          answer: action.payload,
          score:
            question.correctOption === action.payload
              ? state.score + question.points
              : state.score,
        };
      case "nextQuestion":
        return { ...state, currentIndex: state.currentIndex + 1, answer: null };
      case "finish":
        return { ...state, quizStatus: "finish", score: state.score };
      case "reset":
        return { ...initialState, questions: state.questions };
      case "timer":
        return {
          ...state,
          timerRemaining: state.timerRemaining - 1,
          quizStatus: state.timerRemaining === 0 ? "finish" : state.quizStatus,
        };
      case "loading":
        return { ...state, quizStatus: "loading" };
      case "error":
        return { ...state, quizStatus: "error" };
      case "setName":
        return { ...state, name: action.payload };
      case "setHasVisited":
        return { ...state, hasVisited: action.payload };

      default:
        return state;
    }
  }

  const [
    {
      quizStatus,
      questions,
      currentIndex,
      answer,
      timerRemaining,
      name,
      score,
      hasVisited,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // Sayfa kapanırken veya yenilenirken skor ve ismi kaydet
  useEffect(() => {
    const handleBeforeUnload = async (e) => {
      if (name && score > 0 && quizStatus !== "finish") {
        try {
          await createLeadered({ name, score });
        } catch (error) {
          console.error("Veri kaydedilirken hata oluştu:", error);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [name, score, quizStatus]);

  const totalPoints = questions.reduce((sum, item) => sum + item.points, 0);

  return (
    <QuizContext.Provider
      value={{
        quizStatus,
        dispatch,
        totalPoints,
        questions,
        currentIndex,
        answer,
        timerRemaining,
        name,
        score,
        hasVisited,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuizContext() {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error(
      "useQuizContext must be used within a QuizContextProvider."
    );
  }

  return context;
}

export { QuizContextProvider, useQuizContext };
