// src/pages/Disclaimer.jsx

function Disclaimer() {
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
          Disclaimer
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
            1. Platform Availability
          </h2>

          <p style={text}>
            TaskWave is provided on an "as
            available" basis. We do not
            guarantee uninterrupted access,
            instant payouts or continuous
            task availability at all times.
          </p>
        </div>

        <div style={{ marginBottom: "35px" }}>
          <h2 style={heading}>
            2. Earnings Disclaimer
          </h2>

          <p style={text}>
            Earnings displayed on the
            platform are examples and may
            vary depending on task
            availability, user performance,
            verification status and payout
            conditions.
          </p>
        </div>

        <div style={{ marginBottom: "35px" }}>
          <h2 style={heading}>
            3. Third Party Content
          </h2>

          <p style={text}>
            Some tasks may involve external
            websites, apps or social media
            platforms. TaskWave is not
            responsible for third-party
            policies, outages or platform
            changes.
          </p>
        </div>

        <div>
          <h2 style={heading}>
            4. Limitation of Liability
          </h2>

          <p style={text}>
            TaskWave shall not be held
            responsible for indirect
            damages, data loss, account
            misuse or interruptions caused
            by external providers, internet
            failures or unauthorized user
            activity.
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

export default Disclaimer;