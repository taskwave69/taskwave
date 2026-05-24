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

        /* FINAL FIXED SPACING */
        paddingTop: "95px",
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingBottom: "40px",
      }}
    >

      <Sidebar />

      {/* HEADER */}
      <div
        style={{
          marginBottom: "32px",
        }}
      >

        <h1
          style={{
            fontSize: "64px",
            fontWeight: "900",
            letterSpacing: "-3px",
            lineHeight: "1",
            marginBottom: "18px",
          }}
        >
          Dashboard
        </h1>

        <p
          style={{
            fontSize: "17px",
            color: "#9ca3af",
            lineHeight: "38px",
            maxWidth: "700px",
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

          borderRadius: "38px",

          padding: "34px",

          marginBottom: "26px",

          boxShadow:
            "0 0 50px rgba(139,92,246,0.28)",

          position: "relative",

          overflow: "hidden",
        }}
      >

        {/* SMALL CHIP */}
        <div
          style={{
            position: "absolute",
            top: "28px",
            right: "28px",

            background:
              "rgba(255,255,255,0.14)",

            padding:
              "12px 18px",

            borderRadius:
              "18px",

            fontSize: "14px",

            fontWeight: "600",
          }}
        >
          Today
        </div>

        <p
          style={{
            fontSize: "15px",
            opacity: 0.82,
            marginBottom: "26px",
          }}
        >
          Current Balance
        </p>

        <h2
          style={{
            fontSize: "78px",
            fontWeight: "900",
            marginBottom: "28px",
            letterSpacing: "-3px",
          }}
        >
          $0.00
        </h2>

        <p
          style={{
            fontSize: "17px",
            opacity: 0.9,
            lineHeight: "38px",
            maxWidth: "520px",
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

          borderRadius: "34px",

          padding: "30px",

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
              fontSize: "15px",
              marginBottom: "18px",
            }}
          >
            Available Tasks
          </p>

          <h2
            style={{
              fontSize: "52px",
              fontWeight: "900",
              letterSpacing: "-2px",
            }}
          >
            0 Tasks
          </h2>

        </div>

        {/* ICON */}
        <div
          style={{
            width: "110px",
            height: "110px",

            borderRadius: "30px",

            background:
              "rgba(139,92,246,0.12)",

            border:
              "1px solid rgba(139,92,246,0.18)",

            display: "flex",

            alignItems: "center",

            justifyContent:
              "center",

            fontSize: "48px",

            boxShadow:
              "0 0 35px rgba(139,92,246,0.16)",
          }}
        >
          ⚡
        </div>

      </div>

    </div>
  );
}

export default Dashboard;