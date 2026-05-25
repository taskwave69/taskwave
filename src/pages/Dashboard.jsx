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

        fontFamily:
          "Inter, sans-serif",

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
          marginBottom: "24px",
        }}
      >

        <h1
          style={{
            fontSize: "34px",

            fontWeight: "800",

            letterSpacing: "-1px",

            marginBottom: "8px",
          }}
        >
          Dashboard
        </h1>

        <p
          style={{
            fontSize: "14px",

            color: "#9ca3af",

            lineHeight: "26px",

            maxWidth: "420px",
          }}
        >
          Manage earnings,
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

          borderRadius: "24px",

          padding: "22px",

          marginBottom: "18px",

          boxShadow:
            "0 0 35px rgba(139,92,246,0.20)",

          position: "relative",
        }}
      >

        {/* SMALL CHIP */}
        <div
          style={{
            position: "absolute",

            top: "18px",

            right: "18px",

            background:
              "rgba(255,255,255,0.14)",

            padding:
              "7px 12px",

            borderRadius:
              "12px",

            fontSize: "11px",

            fontWeight: "600",
          }}
        >
          Today
        </div>

        <p
          style={{
            fontSize: "13px",

            opacity: 0.82,

            marginBottom: "12px",
          }}
        >
          Current Balance
        </p>

        <h2
          style={{
            fontSize: "42px",

            fontWeight: "800",

            marginBottom: "12px",

            letterSpacing: "-2px",
          }}
        >
          $0.00
        </h2>

        <p
          style={{
            fontSize: "14px",

            opacity: 0.92,

            lineHeight: "26px",

            maxWidth: "320px",
          }}
        >
          Withdraw instantly
          through Binance
          and UPI.
        </p>

      </div>

      {/* TASK CARD */}
      <div
        style={{
          background:
            "rgba(255,255,255,0.03)",

          border:
            "1px solid rgba(255,255,255,0.05)",

          borderRadius: "22px",

          padding: "20px",

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

              fontSize: "13px",

              marginBottom: "10px",
            }}
          >
            Available Tasks
          </p>

          <h2
            style={{
              fontSize: "28px",

              fontWeight: "700",

              letterSpacing: "-1px",
            }}
          >
            0 Tasks
          </h2>

        </div>

        {/* SMALL ICON */}
        <div
          style={{
            width: "58px",

            height: "58px",

            borderRadius: "18px",

            background:
              "rgba(139,92,246,0.10)",

            border:
              "1px solid rgba(139,92,246,0.16)",

            display: "flex",

            alignItems: "center",

            justifyContent:
              "center",

            fontSize: "22px",

            boxShadow:
              "0 0 18px rgba(139,92,246,0.10)",
          }}
        >
          ⚡
        </div>

      </div>

    </div>
  );
}

export default Dashboard;