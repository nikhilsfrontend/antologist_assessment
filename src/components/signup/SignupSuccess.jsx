"use client";

export default function SignupSuccess({ onBack }) {
  return (
    <div className="signup-success">

      <div className="success-celebration">
        <span>🎉</span>
        <span>✨</span>
        <span>🎊</span>
        <span>✨</span>
        <span>🎉</span>
      </div>

      <div className="success-icon">
        <svg
          viewBox="0 0 52 52"
          aria-hidden="true"
        >
          <circle
            className="success-circle"
            cx="26"
            cy="26"
            r="24"
          />

          <path
            className="success-check"
            d="M14 27 L22 35 L38 18"
          />
        </svg>
      </div>

      <h1>Signup Successful!</h1>

      <p>
        Your account has been created successfully.
      </p>

      <p className="success-message">
        Welcome to Atologist Infotech.
      </p>

      <button
        type="button"
        className="success-back-button"
        onClick={onBack}
      >
        Back to Sign Up
      </button>

    </div>
  );
}