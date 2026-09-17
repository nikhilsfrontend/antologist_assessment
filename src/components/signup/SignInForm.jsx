"use client";

import { useState } from "react";

export default function SignInForm({ onBack }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    };


    return (
        <div className="signin-form-content">

            <h1>Welcome Back</h1>

            <p className="signin-subtitle">
                Sign in to your account
            </p>

            <form
                className="signin-form"
                onSubmit={handleSubmit}
            >

                <div
                    className="form-field signin-stagger-item"
                    style={{ "--animation-delay": "0.1s" }}
                >
                    <label htmlFor="username">
                        Username
                    </label>

                    <input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(event) =>
                            setUsername(event.target.value)
                        }
                    />
                </div>

                <div
                    className="form-field signin-stagger-item"
                    style={{ "--animation-delay": "0.2s" }}
                >
                    <label htmlFor="signin-password">
                        Password
                    </label>

                    <input
                        id="signin-password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                    />
                </div>

                <button
                    type="submit"
                    className="signin-submit signin-stretch-item"
                >
                    Sign In (Coming Soon...)
                </button>

                <button
                    type="button"
                    className="back-to-signup"
                    onClick={onBack}
                >
                    Back to Sign Up
                </button>

            </form>

        </div>
    );
}