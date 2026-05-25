// src/pages/Admin.jsx

import { useState } from "react";

import Sidebar from "../components/Sidebar";

function Admin() {

  const [section, setSection] =
    useState("tasks");

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
            marginBottom: "8px",
          }}
        >
          Admin Panel
        </h1>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "14px",
            lineHeight: "26px",
          }}
        >
          Manage tasks, worker
          reviews and wallet balances.
        </p>

      </div>

      {/* FOLDERS */}
      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "1fr 1fr",

          gap: "14px",

          marginBottom: "24px",
        }}
      >

        {/* ADD TASKS */}
        <div
          onClick={() =>
            setSection("tasks")
          }
          style={{
            ...folderStyle,

            border:
              section === "tasks"

                ? "1px solid rgba(139,92,246,0.35)"

                : "1px solid rgba(255,255,255,0.05)",
          }}
        >

          <div
            style={iconStyle}
          >
            ⚡
          </div>

          <h3
            style={folderTitle}
          >
            Add Tasks
          </h3>

        </div>

        {/* REVIEW */}
        <div
          onClick={() =>
            setSection("review")
          }
          style={{
            ...folderStyle,

            border:
              section === "review"

                ? "1px solid rgba(139,92,246,0.35)"

                : "1px solid rgba(255,255,255,0.05)",
          }}
        >

          <div
            style={iconStyle}
          >
            ✅
          </div>

          <h3
            style={folderTitle}
          >
            Review Tasks
          </h3>

        </div>

        {/* WALLET */}
        <div
          onClick={() =>
            setSection("wallet")
          }
          style={{
            ...folderStyle,

            border:
              section === "wallet"

                ? "1px solid rgba(139,92,246,0.35)"

                : "1px solid rgba(255,255,255,0.05)",
          }}
        >

          <div
            style={iconStyle}
          >
            💸
          </div>

          <h3
            style={folderTitle}
          >
            Edit Wallet
          </h3>

        </div>

      </div>

      {/* ADD TASKS SECTION */}
      {section === "tasks" && (

        <div style={cardStyle}>

          <h2 style={sectionTitle}>
            Add New Task
          </h2>

          <input
            placeholder="Task Title"
            style={inputStyle}
          />

          <textarea
            placeholder="Task Description"
            style={textareaStyle}
          />

          <input
            placeholder="Image Hyperlink"
            style={inputStyle}
          />

          <textarea
            placeholder="Instructions"
            style={textareaStyle}
          />

          <input
            placeholder="Task Amount"
            style={inputStyle}
          />

          <button
            style={buttonStyle}
          >
            Publish Task
          </button>

        </div>

      )}

      {/* REVIEW SECTION */}
      {section === "review" && (

        <div style={cardStyle}>

          <h2 style={sectionTitle}>
            Review Worker Tasks
          </h2>

          {/* TASK CARD */}
          <div
            style={reviewCard}
          >

            <div>

              <h3
                style={{
                  fontSize: "16px",
                  marginBottom: "6px",
                }}
              >
                Instagram Follow
              </h3>

              <p
                style={{
                  color: "#9ca3af",
                  fontSize: "13px",
                }}
              >
                Submitted by Worker
              </p>

            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >

              <button
                style={approveBtn}
              >
                Approve
              </button>

              <button
                style={rejectBtn}
              >
                Reject
              </button>

            </div>

          </div>

        </div>

      )}

      {/* WALLET SECTION */}
      {section === "wallet" && (

        <div style={cardStyle}>

          <h2 style={sectionTitle}>
            Edit User Wallet
          </h2>

          <input
            placeholder="User Email / UID"
            style={inputStyle}
          />

          <input
            placeholder="New Balance"
            style={inputStyle}
          />

          <button
            style={buttonStyle}
          >
            Update Balance
          </button>

        </div>

      )}

    </div>
  );
}

const folderStyle = {

  background:
    "rgba(255,255,255,0.03)",

  borderRadius: "24px",

  padding: "22px",

  backdropFilter:
    "blur(18px)",

  cursor: "pointer",

  transition: "0.25s ease",
};

const iconStyle = {

  width: "52px",

  height: "52px",

  borderRadius: "18px",

  background:
    "rgba(139,92,246,0.12)",

  display: "flex",

  alignItems: "center",

  justifyContent:
    "center",

  fontSize: "22px",

  marginBottom: "14px",
};

const folderTitle = {

  fontSize: "15px",

  fontWeight: "700",
};

const cardStyle = {

  background:
    "rgba(255,255,255,0.03)",

  border:
    "1px solid rgba(255,255,255,0.05)",

  borderRadius: "24px",

  padding: "22px",

  backdropFilter:
    "blur(18px)",

  display: "flex",

  flexDirection: "column",

  gap: "16px",
};

const sectionTitle = {

  fontSize: "20px",

  fontWeight: "700",

  marginBottom: "4px",
};

const inputStyle = {

  width: "100%",

  padding: "16px",

  borderRadius: "16px",

  border:
    "1px solid rgba(255,255,255,0.06)",

  background:
    "rgba(255,255,255,0.04)",

  color: "white",

  fontSize: "14px",

  outline: "none",
};

const textareaStyle = {

  width: "100%",

  minHeight: "120px",

  padding: "16px",

  borderRadius: "16px",

  border:
    "1px solid rgba(255,255,255,0.06)",

  background:
    "rgba(255,255,255,0.04)",

  color: "white",

  fontSize: "14px",

  outline: "none",

  resize: "none",
};

const buttonStyle = {

  width: "100%",

  padding: "16px",

  border: "none",

  borderRadius: "18px",

  background:
    "linear-gradient(135deg,#8b5cf6,#7c3aed)",

  color: "white",

  fontSize: "15px",

  fontWeight: "700",

  cursor: "pointer",

  boxShadow:
    "0 0 25px rgba(139,92,246,0.18)",
};

const reviewCard = {

  background:
    "rgba(255,255,255,0.03)",

  border:
    "1px solid rgba(255,255,255,0.05)",

  borderRadius: "18px",

  padding: "18px",

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",
};

const approveBtn = {

  padding: "10px 14px",

  border: "none",

  borderRadius: "12px",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "white",

  cursor: "pointer",

  fontWeight: "600",
};

const rejectBtn = {

  padding: "10px 14px",

  border: "none",

  borderRadius: "12px",

  background:
    "linear-gradient(135deg,#ef4444,#dc2626)",

  color: "white",

  cursor: "pointer",

  fontWeight: "600",
};

export default Admin;