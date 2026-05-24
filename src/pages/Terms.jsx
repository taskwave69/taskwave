// src/pages/Terms.jsx

function Terms() {
  return (
    <div
      style={{
        background:
          "radial-gradient(circle at top,#111827,#050816)",
        minHeight: "100vh",
        color: "white",
        padding: "30px 20px 80px",
        fontFamily: "Inter, Arial",
      }}
    >
      {/* CONTAINER */}
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
          background:
            "rgba(255,255,255,0.03)",
          border:
            "1px solid rgba(255,255,255,0.06)",
          borderRadius: "28px",
          padding: "35px",
          backdropFilter: "blur(18px)",
          boxShadow:
            "0px 0px 50px rgba(0,0,0,0.35)",
        }}
      >
        {/* TITLE */}
        <h1
          style={{
            fontSize: "38px",
            fontWeight: "800",
            marginBottom: "10px",
            letterSpacing: "-1px",
          }}
        >
          Terms of Service
        </h1>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "13px",
            marginBottom: "40px",
          }}
        >
          Last Updated — 2026
        </p>

        {/* SECTION */}
        <div style={{ marginBottom: "35px" }}>
          <h2 style={heading}>
            1. Platform Usage
          </h2>

          <p style={text}>
            TaskWave allows users to
            participate in promotional,
            engagement and social media
            related tasks in exchange for
            rewards. By accessing or using
            TaskWave, users agree to follow
            all platform guidelines,
            community standards and payout
            requirements.
          </p>
        </div>

        {/* SECTION */}
        <div style={{ marginBottom: "35px" }}>
          <h2 style={heading}>
            2. User Responsibilities
          </h2>

          <p style={text}>
            Users must complete tasks
            honestly and submit valid proof
            where required. Fake
            screenshots, spam activity,
            botting, manipulation,
            harassment or misuse of the
            platform may lead to temporary
            suspension or permanent account
            termination.
          </p>
        </div>

        {/* SECTION */}
        <div style={{ marginBottom: "35px" }}>
          <h2 style={heading}>
            3. Rewards & Withdrawals
          </h2>

          <p style={text}>
            Rewards are credited after task
            verification and approval.
            Withdrawals are processed
            through supported payment
            methods including Binance and
            UPI. TaskWave reserves the
            right to delay or reject
            suspicious transactions for
            security and fraud prevention.
          </p>
        </div>

        {/* SECTION */}
        <div style={{ marginBottom: "35px" }}>
          <h2 style={heading}>
            4. Account Security
          </h2>

          <p style={text}>
            Users are responsible for
            maintaining the confidentiality
            of their account credentials.
            Sharing accounts or attempting
            unauthorized access to admin
            systems is strictly prohibited.
          </p>
        </div>

        {/* SECTION */}
        <div>
          <h2 style={heading}>
            5. Policy Updates
          </h2>

          <p style={text}>
            TaskWave may modify these terms
            periodically to improve
            platform safety, performance
            and legal compliance. Continued
            use of the platform after
            updates implies acceptance of
            revised terms and policies.
          </p>
        </div>
      </div>
    </div>
  );
}

const heading = {
  fontSize: "18px",
  marginBottom: "12px",
  fontWeight: "700",
  color: "#c4b5fd",
};

const text = {
  color: "#b6bcc8",
  lineHeight: "32px",
  fontSize: "14px",
};

export default Terms;