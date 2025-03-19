function Button({ message, dispatch, status, fload = "", answer = "" }) {
  if (answer === null) return;
  return (
    <button
      className={`btn ${fload}`}
      onClick={() => dispatch({ type: `${status}` })}
    >
      {message}
    </button>
  );
}

export default Button;
