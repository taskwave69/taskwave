// src/pages/Dashboard.jsx

import Sidebar from "../components/Sidebar";

function Dashboard() {

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#050816,#0f172a)",
        color: "white",
        fontFamily: "Inter, sans-serif",
      }}
    >

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div
        style={{
          paddingTop: "22px",
          paddingLeft: "85px",
          paddingRight: "20px",
          paddingBottom: "40px",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >

        {/* HEADER */}
        <div
          style={{
            marginBottom: "35px",
          }}
        >

          {/* TOP BAR */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              marginBottom: "18px",
              minHeight: "52px",
            }}
          >

            {/* TASKWAVE */}
            <h1
              style={{
                fontSize: "34px",
                fontWeight: "900",
                letterSpacing: "-1px",
                lineHeight: "1",
              }}
            >

              <span
                style={{
                  color: "white",
                }}
              >
                Task
              </span>

              <span
                style={{
                  color: "#8b5cf6",
                }}
              >
                Wave
              </span>

            </h1>

          </div>

          {/* DASHBOARD TITLE */}
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "800",
              letterSpacing: "-1px",
              marginBottom: "12px",
            }}
          >
            Dashboard
          </h1>

          {/* DESCRIPTION */}
          <p
            style={{
              color: "#9ca3af",
              fontSize: "15px",
              lineHeight: "28px",
              maxWidth: "500px",
            }}
          >
            Manage tasks, earnings and
            withdrawals through your
            premium TaskWave account.
          </p>

        </div>

        {/* BALANCE CARD */}
        <div
          style={{
            background:
              "linear-gradient(135deg,#8b5cf6,#7c3aed)",

            borderRadius: "28px",

            padding: "28px",

            marginBottom: "26px",

            boxShadow:
              "0 0 45px rgba(139,92,246,0.22)",

            position: "relative",

            overflow: "hidden",
          }}
        >

          {/* TOP */}
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >

            <p
              style={{
                opacity: 0.8,
                fontSize: "14px",
              }}
            >
              Current Balance
            </p>

            <div
              style={{
                background:
                  "rgba(255,255,255,0.14)",
                padding:
                  "8px 14px",
                borderRadius:
                  "999px",
                fontSize: "12px",
              }}
            >
              Today
            </div>

          </div>

          {/* BALANCE */}
          <h1
            style={{
              fontSize: "52px",
              fontWeight: "900",
              marginBottom: "14px",
              letterSpacing: "-2px",
            }}
          >
            $0.00
          </h1>

          {/* TEXT */}
          <p
            style={{
              fontSize: "14px",
              opacity: 0.9,
              lineHeight: "26px",
              maxWidth: "240px",
            }}
          >
            Withdraw earnings instantly
            through Binance and UPI.
          </p>

          {/* GLOW */}
          <div
            style={{
              position: "absolute",
              width: "180px",
              height: "180px",
              background:
                "rgba(255,255,255,0.10)",
              borderRadius: "50%",
              right: "-60px",
              bottom: "-60px",
              filter: "blur(10px)",
            }}
          />

        </div>

        {/* SMALL CARDS */}
        <div
          style={{
            display: "grid",
            gap: "18px",
          }}
        >

          {/* TASK CARD */}
          <div
            style={cardStyle}
          >

            <div>

              <p
                style={smallTitle}
              >
                Available Tasks
              </p>

              <h2
                style={bigText}
              >
                0 Tasks
              </h2>

            </div>

            <div
              style={iconStyle}
            >
              ⚡
            </div>

          </div>

          {/* WITHDRAW CARD */}
          <div
            style={cardStyle}
          >

            <div>

              <p
                style={smallTitle}
              >
                Withdrawable
              </p>

              <h2
                style={bigText}
              >
                $0.00
              </h2>

            </div>

            <div
              style={iconStyle}
            >
              💸
            </div>

          </div>

          {/* HISTORY CARD */}
          <div
            style={cardStyle}
          >

            <div>

              <p
                style={smallTitle}
              >
                Completed Tasks
              </p>

              <h2
                style={bigText}
              >
                0 Done
              </h2>

            </div>

            <div
              style={iconStyle}
            >
              ✓
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

const cardStyle = {

  background:
    "rgba(255,255,255,0.03)",

  border:
    "1px solid rgba(255,255,255,0.05)",

  padding: "22px",

  borderRadius: "24px",

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  backdropFilter:
    "blur(14px)",
};

const smallTitle = {
  color: "#9ca3af",
  fontSize: "13px",
  marginBottom: "10px",
};

const bigText = {
  fontSize: "28px",
  fontWeight: "800",
};

const iconStyle = {
  width: "54px",
  height: "54px",
  borderRadius: "18px",
  background:
    "rgba(139,92,246,0.12)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "22px",
  border:
    "1px solid rgba(139,92,246,0.14)",
};

export default Dashboard;