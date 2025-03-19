import { useQuizContext } from "../contexts/QuizContext";

function ProgressBar() {
  const { questions, totalPoints, score, currentIndex } = useQuizContext();
  const maxValue = questions.length;
  const value = currentIndex + 1;
  return (
    <div>
      <progress
        value={value}
        max={maxValue}
        className="progressWidth"
      ></progress>
      <div className="progress">
        <div>
          Question {value} / {maxValue}
        </div>
        <div>
          {score} / {totalPoints} points
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
