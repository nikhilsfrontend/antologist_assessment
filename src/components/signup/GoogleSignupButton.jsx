"use client";

import { useEffect, useRef } from "react";

export default function GoogleSignupButton({
  onSuccess,
  onError,
}) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const initializeGoogle = () => {
      if (!window.google || !buttonRef.current) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,

        callback: (response) => {
          if (!response?.credential) {
            onError?.("Google authentication failed.");
            return;
          }

          onSuccess(response.credential);
        },
      });

      buttonRef.current.innerHTML = "";

      window.google.accounts.id.renderButton(
        buttonRef.current,
        {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "signup_with",
          shape: "rectangular",
          width: 100,
        }
      );
    };

    if (window.google) {
      initializeGoogle();
    } else {
      window.onGoogleLibraryLoad = initializeGoogle;
    }

    return () => {
      if (window.onGoogleLibraryLoad === initializeGoogle) {
        window.onGoogleLibraryLoad = null;
      }
    };
  }, [onSuccess, onError]);

  return (
    <div
      ref={buttonRef}
      className="google-button"
    />
  );
}