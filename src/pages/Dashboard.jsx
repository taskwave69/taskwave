// src/pages/Dashboard.jsx

import Sidebar from "../components/Sidebar";

function Dashboard() {

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top,#111827,#050816)",
        color: "white",
        fontFamily: "Inter, sans-serif",

        /* FIXED PREMIUM SPACING */
        paddingTop: "95px",
        paddingLeft: "22px",
        paddingRight: "22px",
        paddingBottom: "40px",
      }}
    >

      <Sidebar />

      {/* HEADER */}
      <div
        style={{
          marginBottom: "28px",
        }}
      >

        <h1
          style={{
            fontSize: "42px",
            fontWeight: "800",
            letterSpacing: "-1.5px",
            marginBottom: "10px",
          }}
        >
          Dashboard
        </h1>

        <p
          style={{
            fontSize: "15px",
            color: "#9ca3af",
            lineHeight: "28px",
            maxWidth: "500px",
          }}
        >
          Manage your earnings,
          withdrawals and active
          social tasks through
          TaskWave.
        </p>

      </div>

      {/* BALANCE CARD */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#8b5cf6,#7c3aed)",

          borderRadius: "28px",

          padding: "26px",

          marginBottom: "22px",

          boxShadow:
            "0 0 40px rgba(139,92,246,0.22)",

          position: "relative",
        }}
      >

        {/* SMALL TAG */}
        <div
          style={{
            position: "absolute",
            top: "22px",
            right: "22px",

            background:
              "rgba(255,255,255,0.14)",

            padding:
              "8px 14px",

            borderRadius:
              "14px",

            fontSize: "12px",

            fontWeight: "600",
          }}
        >
          Today
        </div>

        <p
          style={{
            fontSize: "14px",
            opacity: 0.85,
            marginBottom: "18px",
          }}
        >
          Current Balance
        </p>

        <h2
          style={{
            fontSize: "52px",
            fontWeight: "800",
            marginBottom: "18px",
            letterSpacing: "-2px",
          }}
        >
          $0.00
        </h2>

        <p
          style={{
            fontSize: "15px",
            opacity: 0.92,
            lineHeight: "30px",
            maxWidth: "420px",
          }}
        >
          Withdraw earnings instantly
          through Binance and UPI.
        </p>

      </div>

      {/* TASK CARD */}
      <div
        style={{
          background:
            "rgba(255,255,255,0.03)",

          border:
            "1px solid rgba(255,255,255,0.05)",

          borderRadius: "28px",

          padding: "24px",

          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          backdropFilter:
            "blur(18px)",
        }}
      >

        <div>

          <p
            style={{
              color: "#9ca3af",
              fontSize: "14px",
              marginBottom: "12px",
            }}
          >
            Available Tasks
          </p>

          <h2
            style={{
              fontSize: "36px",
              fontWeight: "800",
              letterSpacing: "-1px",
            }}
          >
            0 Tasks
          </h2>

        </div>

        {/* ICON */}
        <div
          style={{
            width: "82px",
            height: "82px",

            borderRadius: "24px",

            background:
              "rgba(139,92,246,0.12)",

            border:
              "1px solid rgba(139,92,246,0.18)",

            display: "flex",

            alignItems: "center",

            justifyContent:
              "center",

            fontSize: "34px",

            boxShadow:
              "0 0 25px rgba(139,92,246,0.12)",
          }}
        >
          ⚡
        </div>

      </div>

    </div>
  );
}

export default Dashboard;