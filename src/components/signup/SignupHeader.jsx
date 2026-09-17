export default function SignupHeader({ onSignIn }) {
    return (
        <header className="signup-header">

            <div className="signup-logo">
                <img
                    src="/images/signup/antologist_logo.jpg"
                    alt="Atologist"
                    width={198}
                    height={62}
                />
            </div>

            <div className="signup-login">
                <span className="signin-text">
                    Already have an account?
                </span>

                <button
                    type="button"
                    className="signin-button"
                    onClick={onSignIn}
                >
                    Sign In
                </button>
            </div>

        </header>
    );
}