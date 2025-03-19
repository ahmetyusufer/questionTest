import { useEffect } from "react";

import Button from "./Button";
import Header from "./Header";
import WelcomeMessage from "./WelcomeMessage";
import Questions from "./Questions";
import ProgressBar from "./ProgressBar";
import Main from "./Main";
import Finish from "./Finish";
import Timer from "./Timer";
import Spinner from "./Spinner";
import Error from "./Error";

import questionData from "..//data/questions.json";
import { useQuizContext } from "../contexts/QuizContext";

function App() {
  const { quizStatus, questions, currentIndex, answer, dispatch, hasVisited } =
    useQuizContext();

  useEffect(() => {
    dispatch({ type: "loading" });
    try {
      dispatch({ type: "dataRecevied", payload: questionData.questions });
    } catch {
      dispatch({ type: "error" });
    }
  }, [dispatch]);

  useEffect(() => {
    if (hasVisited) {
      dispatch({ type: "finish" });
    }
  }, [dispatch, hasVisited]);

  return (
    <div className="app">
      <Header />

      <Main>
        {quizStatus === "welcome" && (
          <>
            <WelcomeMessage />
          </>
        )}
        {quizStatus === "start" && (
          <>
            {localStorage.setItem("hasVisited", true)}
            <ProgressBar />
            <Questions />
            <Timer />
            {questions.length === currentIndex + 1 ? (
              <Button
                message={"Finish"}
                status={"finish"}
                dispatch={dispatch}
                fload={"btn-ui"}
                answer={answer}
              />
            ) : (
              <Button
                message={"Next"}
                status={"nextQuestion"}
                dispatch={dispatch}
                fload={"btn-ui"}
                answer={answer}
              />
            )}
          </>
        )}
        {quizStatus === "finish" && (
          <>
            <Finish />
          </>
        )}
        {quizStatus === "loading" && <Spinner />}
        {quizStatus === "error" && <Error />}
      </Main>
    </div>
  );
}

export default App;
