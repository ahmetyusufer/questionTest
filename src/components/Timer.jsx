import { useQuizContext } from "../contexts/QuizContext";

import { useEffect } from "react";

function Timer() {
  const { dispatch, timerRemaining } = useQuizContext();

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "timer" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  const min = Math.floor(timerRemaining / 60);
  const sec = timerRemaining % 60;

  return (
    <div className="timer">
      {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
    </div>
  );
}

export default Timer;
