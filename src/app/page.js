import SignupSection from "@/components/signup/SignupSection";
import IllustrationSection from "@/components/signup/IllustrationSection";

export default function Home() {
  return (
    <main className="signup-page">
      <div className="signup-layout">
        <SignupSection />
        <IllustrationSection />

        <button
          type="button"
          className="chat-button"
          aria-label="Open chat"
        >
          ?
        </button>
      </div>
    </main>
  );
}