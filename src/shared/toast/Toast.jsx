import "./Toast.css";

function Toast({ message, type, show }) {
  return (
    <div className={`toast ${type} ${show ? "show" : ""}`}>
      <span className="toast-icon">
        {type === "success" && "✓"}
        {type === "error" && "✕"}
        {type === "warning" && "!"}
      </span>

      {message}
    </div>
  );
}

export default Toast;