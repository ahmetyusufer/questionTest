import { useQuizContext } from "../contexts/QuizContext";

function Options() {
  const { questions, dispatch, answer, currentIndex } = useQuizContext();
  const question = questions[currentIndex];

  const hasAnswered = answer !== null;
  return (
    <>
      {question.options.map((option, index) => (
        <button
          key={index}
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            hasAnswered
              ? question.correctOption === index
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </>
  );
}

export default Options;
