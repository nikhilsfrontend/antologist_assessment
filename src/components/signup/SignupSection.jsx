// import SignupHeader from "./SignupHeader";
// import SignupForm from "./SignupForm";

// export default function SignupSection() {
//   return (
//     <section className="signup-section">
//       <SignupHeader />
//       <SignupForm />
//     </section>
//   );
// }


"use client";

import { useState } from "react";

import SignupHeader from "./SignupHeader";
import SignupForm from "./SignupForm";
import SignInForm from "./SignInForm";

export default function SignupSection() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [signInReady, setSignInReady] = useState(false);

  return (
    <section className="signup-section">

      <SignupHeader
        onSignIn={() => {
          setSignInReady(false);
          setShowSignIn(true)
        }}
      />

      <div
        className={`auth-flip ${showSignIn
          ? "auth-flip--signin"
          : ""
          }`}
        onTransitionEnd={() => {
          if (showSignIn) {
            setSignInReady(true);
          }
        }}
      >
        <div className="auth-flip-inner">

          {/* SIGN UP */}
          <div className="auth-face auth-front">
            <SignupForm
            key={showSignIn ? "signup-hidden" : "signup-visible"}
            />
          </div>

          {/* SIGN IN */}
          <div className={`auth-face auth-back ${signInReady
            ? "auth-back--ready"
            : ""
            }`}>
            <SignInForm
              key={showSignIn ? "signin-visible" : "signin-hidden"}
              onBack={() => {
                setSignInReady(false);
                setShowSignIn(false);
              }}
            />
          </div>

        </div>
      </div>

    </section>
  );
}