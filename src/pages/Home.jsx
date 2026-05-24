import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        background:
          "radial-gradient(circle at top,#111827,#050816)",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 20px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(5,8,22,0.7)",
          backdropFilter: "blur(12px)",
          borderBottom:
            "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "900",
          }}
        >
          <span style={{ color: "white" }}>
            Task
          </span>

          <span style={{ color: "#8b5cf6" }}>
            Wave
          </span>
        </h1>

        <Link to="/login">
          <button
            style={{
              border: "none",
              background:
                "linear-gradient(135deg,#8b5cf6,#7c3aed)",
              color: "white",
              padding: "12px 18px",
              borderRadius: "14px",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
              boxShadow:
                "0 0 25px rgba(139,92,246,0.35)",
            }}
          >
            Sign In
          </button>
        </Link>
      </nav>

      {/* HERO */}
      <section
        style={{
          padding: "30px 18px 80px",
        }}
      >
        {/* BADGE */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background:
              "rgba(139,92,246,0.14)",
            padding: "10px 16px",
            borderRadius: "999px",
            color: "#c4b5fd",
            fontSize: "13px",
            fontWeight: "bold",
            marginBottom: "28px",
          }}
        >
          ● Live earning platform
        </div>

        {/* HEADING */}
        <h1
          style={{
            fontSize: "42px",
            lineHeight: "48px",
            fontWeight: "900",
            marginBottom: "24px",
          }}
        >
          Turn your
          <br />
          online activity
          <br />
          into{" "}
          <span
            style={{
              color: "#8b5cf6",
            }}
          >
            earnings.
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p
          style={{
            color: "#9ca3af",
            fontSize: "16px",
            lineHeight: "29px",
            marginBottom: "35px",
          }}
        >
          Complete social media tasks,
          grow communities and withdraw
          instantly via Binance or UPI.
        </p>

        {/* CARD */}
        <div
          style={{
            background:
              "rgba(255,255,255,0.03)",
            border:
              "1px solid rgba(255,255,255,0.06)",
            borderRadius: "30px",
            padding: "24px",
            backdropFilter: "blur(14px)",
            boxShadow:
              "0 0 40px rgba(139,92,246,0.12)",
            marginBottom: "30px",
          }}
        >
          <p
            style={{
              color: "#9ca3af",
              marginBottom: "10px",
              fontSize: "14px",
            }}
          >
            Today's Earnings
          </p>

          <h1
            style={{
              fontSize: "52px",
              fontWeight: "900",
              marginBottom: "28px",
            }}
          >
            $24.80
          </h1>

          {/* TASKS */}
          <div
            style={{
              display: "grid",
              gap: "14px",
            }}
          >
            <div style={taskCard}>
              <div>
                <h3 style={taskTitle}>
                  Instagram Follow
                </h3>

                <p style={taskDesc}>
                  Social Task
                </p>
              </div>

              <strong style={price}>
                +$2
              </strong>
            </div>

            <div style={taskCard}>
              <div>
                <h3 style={taskTitle}>
                  Reddit Comment
                </h3>

                <p style={taskDesc}>
                  Engagement Task
                </p>
              </div>

              <strong style={price}>
                +$1.5
              </strong>
            </div>

            <div style={taskCard}>
              <div>
                <h3 style={taskTitle}>
                  Twitter Repost
                </h3>

                <p style={taskDesc}>
                  Promotion Task
                </p>
              </div>

              <strong style={price}>
                +$1
              </strong>
            </div>
          </div>

          {/* PAYOUTS */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "24px",
              flexWrap: "wrap",
            }}
          >
            <div style={payCard}>
              Binance
            </div>

            <div style={payCard}>
              UPI
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div
          style={{
            display: "grid",
            gap: "16px",
          }}
        >
          <Link to="/signup">
            <button
              style={{
                width: "100%",
                border: "none",
                padding: "18px",
                borderRadius: "18px",
                background:
                  "linear-gradient(135deg,#8b5cf6,#7c3aed)",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow:
                  "0 0 35px rgba(139,92,246,0.35)",
              }}
            >
              Start Earning →
            </button>
          </Link>

          <button
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "18px",
              border:
                "1px solid rgba(255,255,255,0.08)",
              background:
                "rgba(255,255,255,0.02)",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Explore Tasks
          </button>
        </div>

        {/* FOOTER */}
        <footer
          style={{
            marginTop: "80px",
            borderTop:
              "1px solid rgba(255,255,255,0.06)",
            paddingTop: "45px",
          }}
        >
          <div
            style={{
              display: "grid",
              gap: "35px",
            }}
          >
            {/* BRAND */}
            <div>
              <h2
                style={{
                  fontSize: "28px",
                  marginBottom: "14px",
                }}
              >
                <span style={{ color: "white" }}>
                  Task
                </span>

                <span style={{ color: "#8b5cf6" }}>
                  Wave
                </span>
              </h2>

              <p
                style={{
                  color: "#9ca3af",
                  lineHeight: "28px",
                  fontSize: "14px",
                }}
              >
                Complete social tasks and
                withdraw instantly using
                Binance or UPI.
              </p>
            </div>

            {/* LEGAL */}
            <div>
              <h3
                style={{
                  marginBottom: "18px",
                  fontSize: "18px",
                }}
              >
                Legal
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <a
                  href="/terms"
                  style={footerLink}
                >
                  Terms of Service
                </a>

                <a
                  href="/privacy"
                  style={footerLink}
                >
                  Privacy Policy
                </a>

                <a
                  href="/cookies"
                  style={footerLink}
                >
                  Cookie Policy
                </a>

                <a
                  href="/disclaimer"
                  style={footerLink}
                >
                  Disclaimer
                </a>
              </div>
            </div>

            {/* COMMUNITY */}
            <div>
              <h3
                style={{
                  marginBottom: "18px",
                  fontSize: "18px",
                }}
              >
                Community
              </h3>

              <a
                href="https://discord.gg/CGtfreSMP"
                target="_blank"
                rel="noreferrer"
                style={footerLink}
              >
                Discord Server
              </a>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div
            style={{
              borderTop:
                "1px solid rgba(255,255,255,0.06)",
              marginTop: "40px",
              paddingTop: "24px",
              textAlign: "center",
              color: "#6b7280",
              fontSize: "13px",
            }}
          >
            © 2026 TaskWave.
            All rights reserved.
          </div>
        </footer>
      </section>
    </div>
  );
}

const taskCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  borderRadius: "18px",
  background:
    "rgba(255,255,255,0.03)",
  border:
    "1px solid rgba(255,255,255,0.04)",
};

const taskTitle = {
  margin: 0,
  fontSize: "15px",
};

const taskDesc = {
  marginTop: "5px",
  color: "#9ca3af",
  fontSize: "12px",
};

const price = {
  color: "#8b5cf6",
  fontSize: "18px",
};

const payCard = {
  background:
    "rgba(139,92,246,0.14)",
  border:
    "1px solid rgba(139,92,246,0.2)",
  padding: "10px 16px",
  borderRadius: "14px",
  fontWeight: "bold",
  color: "#c4b5fd",
  fontSize: "14px",
};

const footerLink = {
  color: "#9ca3af",
  textDecoration: "none",
  fontSize: "14px",
};

export default Home;