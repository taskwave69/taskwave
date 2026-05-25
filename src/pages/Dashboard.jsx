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

        paddingLeft: "20px",

        paddingRight: "20px",

        paddingBottom: "40px",
      }}
    >

      <Sidebar />

      {/* HEADER */}
      <div
        style={{
          marginBottom: "20px",
        }}
      >

        <h1
          style={{
            fontSize: "28px",

            fontWeight: "700",

            letterSpacing: "-1px",

            marginBottom: "6px",
          }}
        >
          Dashboard
        </h1>

        <p
          style={{
            color: "#9ca3af",

            fontSize: "13px",

            lineHeight: "24px",
          }}
        >
          Manage tasks and earnings
          through your TaskWave account.
        </p>

      </div>

      {/* PROFILE APPROVED */}
      <div
        style={{
          background:
            "rgba(139,92,246,0.10)",

          border:
            "1px solid rgba(139,92,246,0.22)",

          borderRadius: "18px",

          padding: "16px",

          marginBottom: "20px",

          backdropFilter:
            "blur(14px)",
        }}
      >

        <p
          style={{
            color: "#c4b5fd",

            fontSize: "14px",

            fontWeight: "600",

            marginBottom: "6px",
          }}
        >
          ✓ Profile Approved
        </p>

        <p
          style={{
            color: "#9ca3af",

            fontSize: "13px",

            lineHeight: "22px",
          }}
        >
          Your account is approved.
          You can now browse and
          complete tasks.
        </p>

      </div>

      {/* CARDS */}
      <div
        style={{
          display: "grid",

          gap: "16px",
        }}
      >

        {/* AVAILABLE */}
        <div style={cardStyle}>

          <div>

            <p style={smallText}>
              Available Tasks
            </p>

            <h2 style={numberText}>
              0
            </h2>

            <p style={subText}>
              Tasks you can accept
            </p>

          </div>

          <div style={iconBox}>
            ⚡
          </div>

        </div>

        {/* ACTIVE */}
        <div style={cardStyle}>

          <div>

            <p style={smallText}>
              Active Tasks
            </p>

            <h2 style={numberText}>
              0
            </h2>

            <p style={subText}>
              Tasks in progress
            </p>

          </div>

          <div style={iconBox}>
            ⏳
          </div>

        </div>

        {/* COMPLETED */}
        <div style={cardStyle}>

          <div>

            <p style={smallText}>
              Completed
            </p>

            <h2 style={numberText}>
              0
            </h2>

            <p style={subText}>
              Successfully completed
            </p>

          </div>

          <div style={iconBox}>
            ✓
          </div>

        </div>

        {/* BALANCE */}
        <div
          style={{
            background:
              "linear-gradient(135deg,#8b5cf6,#7c3aed)",

            borderRadius: "22px",

            padding: "22px",

            display: "flex",

            justifyContent:
              "space-between",

            alignItems: "center",

            boxShadow:
              "0 0 35px rgba(139,92,246,0.18)",
          }}
        >

          <div>

            <p
              style={{
                fontSize: "13px",

                opacity: 0.85,

                marginBottom: "10px",
              }}
            >
              Balance
            </p>

            <h2
              style={{
                fontSize: "34px",

                fontWeight: "700",

                marginBottom: "8px",
              }}
            >
              $0.00
            </h2>

            <p
              style={{
                fontSize: "13px",

                opacity: 0.85,
              }}
            >
              Available to withdraw
            </p>

          </div>

          <div
            style={{
              width: "56px",

              height: "56px",

              borderRadius: "18px",

              background:
                "rgba(255,255,255,0.14)",

              display: "flex",

              alignItems: "center",

              justifyContent:
                "center",

              fontSize: "24px",
            }}
          >
            💸
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

  borderRadius: "22px",

  padding: "20px",

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  backdropFilter:
    "blur(18px)",
};

const iconBox = {

  width: "52px",

  height: "52px",

  borderRadius: "16px",

  background:
    "rgba(139,92,246,0.10)",

  border:
    "1px solid rgba(139,92,246,0.18)",

  display: "flex",

  alignItems: "center",

  justifyContent:
    "center",

  fontSize: "20px",
};

const smallText = {

  color: "#9ca3af",

  fontSize: "13px",

  marginBottom: "10px",
};

const numberText = {

  fontSize: "34px",

  fontWeight: "700",

  marginBottom: "8px",
};

const subText = {

  color: "#9ca3af",

  fontSize: "13px",
};

export default Dashboard;