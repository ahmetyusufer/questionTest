import { useQuizContext } from "../contexts/QuizContext";

import Options from "./Options";

function Questions() {
  const { questions, currentIndex } = useQuizContext();
  const question = questions[currentIndex];

  return (
    <div className="questions">
      <h4>{question.question}</h4>

      <div className="options">
        <Options />
      </div>
    </div>
  );
}
export default Questions;
