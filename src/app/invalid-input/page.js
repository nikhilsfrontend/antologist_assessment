import Link from "next/link";

export default function InvalidInputPage() {
  return (
    <main className="invalid-input-page">
      <div className="invalid-input-card">
        <div className="invalid-input-icon">
          !
        </div>

        <h1>Enter valid Input</h1>

        <p>
          Please check the information you entered
          and try again.
        </p>

        <Link href="/">
          Back to Signup
        </Link>
      </div>
    </main>
  );
}