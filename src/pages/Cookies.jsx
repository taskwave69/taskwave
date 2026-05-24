// src/pages/Cookies.jsx

function Cookies() {
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
          Cookie Policy
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
            1. What Are Cookies
          </h2>

          <p style={text}>
            Cookies are small files stored
            on your device to improve site
            performance, login persistence
            and user experience while using
            TaskWave.
          </p>
        </div>

        <div style={{ marginBottom: "35px" }}>
          <h2 style={heading}>
            2. Usage of Cookies
          </h2>

          <p style={text}>
            TaskWave uses cookies to keep
            users signed in, remember basic
            preferences and maintain secure
            session authentication across
            devices and browsers.
          </p>
        </div>

        <div style={{ marginBottom: "35px" }}>
          <h2 style={heading}>
            3. Analytics
          </h2>

          <p style={text}>
            Anonymous usage analytics may
            be collected to improve
            platform speed, usability and
            task performance tracking.
          </p>
        </div>

        <div>
          <h2 style={heading}>
            4. Cookie Control
          </h2>

          <p style={text}>
            Users may disable cookies from
            their browser settings, though
            some features of TaskWave may
            not function correctly without
            session storage enabled.
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

export default Cookies;