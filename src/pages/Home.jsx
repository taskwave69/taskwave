// src/pages/Home.jsx

import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        background: "#050816",
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
          padding: "25px 8%",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          position: "sticky",
          top: 0,
          backdropFilter: "blur(12px)",
          background: "rgba(5,8,22,0.7)",
          zIndex: 100,
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          <span style={{ color: "white" }}>Task</span>
          <span style={{ color: "#8b5cf6" }}>Wave</span>
        </h1>

        <div
          style={{
            display: "flex",
            gap: "25px",
            alignItems: "center",
          }}
        >
          <Link to="/" style={navLink}>
            Home
          </Link>

          <Link to="/tasks" style={navLink}>
            Tasks
          </Link>

          <Link to="/dashboard" style={navLink}>
            Dashboard
          </Link>

          <Link to="/login">
            <button
              style={{
                background:
                  "linear-gradient(135deg,#8b5cf6,#7c3aed)",
                border: "none",
                color: "white",
                padding: "14px 28px",
                borderRadius: "14px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "16px",
                boxShadow:
                  "0px 0px 25px rgba(139,92,246,0.5)",
              }}
            >
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px 8%",
          gap: "60px",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            flex: 1,
            minWidth: "320px",
          }}
        >
          <div
            style={{
              background: "rgba(139,92,246,0.15)",
              border: "1px solid rgba(139,92,246,0.3)",
              display: "inline-flex",
              padding: "10px 20px",
              borderRadius: "999px",
              marginBottom: "30px",
              color: "#c4b5fd",
              fontWeight: "bold",
            }}
          >
            ● 1,270+ Active Earners
          </div>

          <h1
            style={{
              fontSize: "78px",
              lineHeight: "90px",
              fontWeight: "900",
              marginBottom: "25px",
            }}
          >
            Turn your <br />
            social activity into{" "}
            <span
              style={{
                color: "#8b5cf6",
              }}
            >
              income.
            </span>
          </h1>

          <p
            style={{
              color: "#9ca3af",
              fontSize: "22px",
              lineHeight: "38px",
              maxWidth: "650px",
            }}
          >
            Complete social media tasks and earn rewards
            instantly. Withdraw using crypto, PayPal,
            Binance or UPI.
          </p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "45px",
              flexWrap: "wrap",
            }}
          >
            <Link to="/signup">
              <button style={primaryBtn}>
                Start Earning →
              </button>
            </Link>

            <button style={secondaryBtn}>
              See How It Works
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            flex: 1,
            minWidth: "320px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "420px",
              background:
                "linear-gradient(180deg,#111827,#0f172a)",
              borderRadius: "35px",
              padding: "35px",
              border:
                "1px solid rgba(139,92,246,0.25)",
              boxShadow:
                "0px 0px 60px rgba(139,92,246,0.3)",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "25px",
              }}
            >
              <div>
                <p
                  style={{
                    color: "#9ca3af",
                  }}
                >
                  Balance
                </p>

                <h1
                  style={{
                    fontSize: "55px",
                    marginTop: "10px",
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
                  height: "fit-content",
                  padding: "10px 18px",
                  borderRadius: "999px",
                  fontWeight: "bold",
                }}
              >
                +12%
              </div>
            </div>

            {/* GRAPH */}
            <div
              style={{
                height: "180px",
                borderRadius: "20px",
                background:
                  "linear-gradient(180deg,#1e1b4b,#111827)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#8b5cf6",
                fontSize: "22px",
                marginBottom: "25px",
              }}
            >
              Earnings Graph
            </div>

            {/* PAYOUT */}
            <div
              style={{
                background: "#0f172a",
                padding: "20px",
                borderRadius: "20px",
              }}
            >
              <p style={{ color: "#9ca3af" }}>
                Recent Payout
              </p>

              <h2
                style={{
                  marginTop: "10px",
                }}
              >
                PayPal — $15.00
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
          padding: "0 8% 100px",
        }}
      >
        <div style={statsCard}>
          <h1 style={statsNumber}>$283,679</h1>
          <p style={statsText}>Paid Out</p>
        </div>

        <div style={statsCard}>
          <h1 style={statsNumber}>1,270+</h1>
          <p style={statsText}>Users</p>
        </div>

        <div style={statsCard}>
          <h1 style={statsNumber}>$5</h1>
          <p style={statsText}>Minimum Cashout</p>
        </div>
      </section>
    </div>
  );
}

const navLink = {
  color: "white",
  textDecoration: "none",
  fontSize: "17px",
};

const primaryBtn = {
  background:
    "linear-gradient(135deg,#8b5cf6,#7c3aed)",
  border: "none",
  color: "white",
  padding: "18px 35px",
  borderRadius: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "18px",
  boxShadow:
    "0px 0px 30px rgba(139,92,246,0.5)",
};

const secondaryBtn = {
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.15)",
  color: "white",
  padding: "18px 35px",
  borderRadius: "16px",
  cursor: "pointer",
  fontSize: "18px",
};

const statsCard = {
  background: "#111827",
  padding: "35px",
  borderRadius: "25px",
  border: "1px solid rgba(139,92,246,0.2)",
};

const statsNumber = {
  fontSize: "45px",
  marginBottom: "15px",
};

const statsText = {
  color: "#9ca3af",
  fontSize: "18px",
};

export default Home;