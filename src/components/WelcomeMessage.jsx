import { useQuizContext } from "../contexts/QuizContext";
import { name } from "../data/questions.json";
import { useState } from "react";

import Button from "./Button";

function WelcomeMessage() {
  const [showError, setShowError] = useState(false);

  const { questions, dispatch, name: userName } = useQuizContext();
  const numQuestion = questions.length;

  const handleNameChange = (e) => {
    const newName = e.target.value;
    dispatch({ type: "setName", payload: newName });
    if (newName.length < 3) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.length < 3) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  return (
    <div>
      <div className="welcome">
        <h2>"{name}&apos;i ne kadar tanıyorum testine hoş geldin!"</h2>
        <h4 className="welcome-top">
          <span className="text-color">
            {numQuestion} soruluk bir test olacak
          </span>
          , hazırsan başlayalım.
        </h4>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <input
              className="searchBar"
              placeholder="İsminizi Girin"
              value={userName}
              onChange={handleNameChange}
            />
            <div>
              {showError && (
                <h4
                  style={{
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                  Lütfen iki karakterden uzun bir isim giriniz.
                </h4>
              )}
            </div>
          </div>

          <Button
            message={"Hazır hissediyorum!"}
            dispatch={dispatch}
            status={userName.length >= 3 ? "start" : "welcome"}
            fload="button"
          />
        </form>
      </div>
    </div>
  );
}

export default WelcomeMessage;
