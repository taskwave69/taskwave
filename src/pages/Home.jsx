// src/pages/Home.jsx

import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        background:
          "radial-gradient(circle at top,#111827,#050816)",
        minHeight: "100vh",
        color: "white",
        overflow: "hidden",
        fontFamily: "Arial",
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(5,8,22,0.75)",
          backdropFilter: "blur(12px)",
          borderBottom:
            "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            fontWeight: "900",
            letterSpacing: "1px",
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
              background:
                "linear-gradient(135deg,#8b5cf6,#7c3aed)",
              border: "none",
              color: "white",
              padding: "13px 24px",
              borderRadius: "16px",
              fontWeight: "bold",
              fontSize: "15px",
              boxShadow:
                "0px 0px 25px rgba(139,92,246,0.45)",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </Link>
      </nav>

      {/* HERO */}
      <section
        style={{
          padding: "35px 20px 90px",
        }}
      >
        {/* BADGE */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            background:
              "rgba(139,92,246,0.15)",
            border:
              "1px solid rgba(139,92,246,0.25)",
            padding: "10px 18px",
            borderRadius: "999px",
            color: "#c4b5fd",
            fontWeight: "bold",
            marginBottom: "30px",
            fontSize: "14px",
            boxShadow:
              "0px 0px 20px rgba(139,92,246,0.15)",
          }}
        >
          ● Earn Instantly Worldwide
        </div>

        {/* HEADING */}
        <h1
          style={{
            fontSize: "60px",
            lineHeight: "62px",
            fontWeight: "900",
            marginBottom: "25px",
            letterSpacing: "-2px",
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
              textShadow:
                "0px 0px 30px rgba(139,92,246,0.7)",
            }}
          >
            earnings.
          </span>
        </h1>

        {/* SUBTEXT */}
        <p
          style={{
            color: "#9ca3af",
            fontSize: "20px",
            lineHeight: "35px",
            marginBottom: "45px",
          }}
        >
          Complete social tasks, grow communities
          and earn rewards directly to your
          Binance or UPI wallet.
        </p>

        {/* MAIN CARD */}
        <div
          style={{
            background:
              "linear-gradient(180deg,#111827,#0f172a)",
            borderRadius: "35px",
            padding: "30px",
            border:
              "1px solid rgba(139,92,246,0.18)",
            boxShadow:
              "0px 0px 60px rgba(139,92,246,0.2)",
            marginBottom: "35px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* GLOW */}
          <div
            style={{
              position: "absolute",
              width: "220px",
              height: "220px",
              background:
                "rgba(139,92,246,0.15)",
              borderRadius: "50%",
              top: "-60px",
              right: "-60px",
              filter: "blur(40px)",
            }}
          />

          {/* BALANCE */}
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div>
              <p
                style={{
                  color: "#9ca3af",
                  fontSize: "15px",
                }}
              >
                Total Earnings
              </p>

              <h1
                style={{
                  fontSize: "58px",
                  marginTop: "10px",
                  fontWeight: "900",
                }}
              >
                $24.80
              </h1>
            </div>

            <div
              style={{
                background:
                  "rgba(34,197,94,0.15)",
                color: "#22c55e",
                padding: "10px 16px",
                borderRadius: "999px",
                fontWeight: "bold",
                fontSize: "14px",
                border:
                  "1px solid rgba(34,197,94,0.2)",
              }}
            >
              +12%
            </div>
          </div>

          {/* TASK CARDS */}
          <div
            style={{
              display: "grid",
              gap: "15px",
              marginTop: "35px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div style={taskCard}>
              <div>
                <h3 style={taskTitle}>
                  Instagram Follow
                </h3>

                <p style={taskDesc}>
                  Social Media Task
                </p>
              </div>

              <strong style={priceText}>
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

              <strong style={priceText}>
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

              <strong style={priceText}>
                +$1
              </strong>
            </div>
          </div>

          {/* PAYOUT METHODS */}
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              position: "relative",
              zIndex: 2,
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
            gap: "18px",
          }}
        >
          <Link to="/signup">
            <button
              style={{
                width: "100%",
                padding: "20px",
                border: "none",
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg,#8b5cf6,#7c3aed)",
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
                boxShadow:
                  "0px 0px 35px rgba(139,92,246,0.45)",
                cursor: "pointer",
              }}
            >
              Start Earning →
            </button>
          </Link>

          <button
            style={{
              width: "100%",
              padding: "20px",
              borderRadius: "20px",
              border:
                "1px solid rgba(255,255,255,0.08)",
              background:
                "rgba(255,255,255,0.02)",
              backdropFilter: "blur(10px)",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Explore Tasks
          </button>
        </div>
      </section>
    </div>
  );
}

const taskCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background:
    "rgba(255,255,255,0.03)",
  padding: "18px",
  borderRadius: "20px",
  border:
    "1px solid rgba(255,255,255,0.04)",
};

const taskTitle = {
  margin: 0,
  fontSize: "17px",
};

const taskDesc = {
  marginTop: "5px",
  color: "#9ca3af",
  fontSize: "13px",
};

const priceText = {
  color: "#8b5cf6",
  fontSize: "20px",
};

const payCard = {
  background:
    "rgba(139,92,246,0.12)",
  border:
    "1px solid rgba(139,92,246,0.18)",
  padding: "12px 18px",
  borderRadius: "14px",
  fontWeight: "bold",
  color: "#c4b5fd",
};

export default Home;