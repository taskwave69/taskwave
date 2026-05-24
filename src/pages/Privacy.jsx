// src/pages/Privacy.jsx

function Privacy() {
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
        }}
      >
        <h1
          style={{
            fontSize: "38px",
            fontWeight: "800",
            marginBottom: "10px",
          }}
        >
          Privacy Policy
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

        <div style={{ marginBottom: "35px" }}>
          <h2 style={heading}>
            1. Information Collection
          </h2>

          <p style={text}>
            TaskWave collects basic user
            information such as email
            addresses, usernames, payout
            details and completed task
            activity for authentication,
            verification and platform
            functionality purposes.
          </p>
        </div>

        <div style={{ marginBottom: "35px" }}>
          <h2 style={heading}>
            2. Security & Protection
          </h2>

          <p style={text}>
            We use Firebase authentication
            and secured cloud services to
            protect user information from
            unauthorized access, abuse or
            malicious activity.
          </p>
        </div>

        <div style={{ marginBottom: "35px" }}>
          <h2 style={heading}>
            3. Third Party Services
          </h2>

          <p style={text}>
            TaskWave may integrate with
            payment providers, analytics
            tools and external social
            platforms required for task
            completion and withdrawals.
          </p>
        </div>

        <div>
          <h2 style={heading}>
            4. Data Usage
          </h2>

          <p style={text}>
            User information is used only
            for platform operations,
            payouts, fraud prevention and
            improving overall user
            experience. TaskWave does not
            sell personal user data to
            third parties.
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

export default Privacy;