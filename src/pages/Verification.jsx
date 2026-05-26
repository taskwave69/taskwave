// src/pages/Verification.jsx

import { useState } from "react";

import {
  auth,
  db
} from "../firebase";

import {
  doc,
  setDoc
} from "firebase/firestore";

import {
  useNavigate
} from "react-router-dom";

function Verification() {

  const navigate =
    useNavigate();

  const [redditUsername, setRedditUsername] =
    useState("");

  const [redditLink, setRedditLink] =
    useState("");

  const [discordJoined, setDiscordJoined] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleVerification =
    async () => {

      if (
        !redditUsername ||
        !redditLink ||
        !discordJoined
      ) {

        alert(
          "Complete all fields"
        );

        return;
      }

      try {

        setLoading(true);

        const user =
          auth.currentUser;

        await setDoc(
          doc(
            db,
            "users",
            user.uid
          ),
          {
            email:
              user.email,

            redditUsername,

            redditLink,

            discordJoined,

            approved: false,

            balance: 0,
          },
          { merge: true }
        );

        // REDIRECT TO DASHBOARD
        navigate("/dashboard");

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <div
      style={{
        minHeight: "100vh",

        background:
          "radial-gradient(circle at top,#111827,#050816)",

        display: "flex",

        justifyContent:
          "center",

        alignItems: "center",

        padding: "24px",

        fontFamily:
          "Inter, sans-serif",
      }}
    >

      <div
        style={{
          width: "100%",

          maxWidth: "430px",

          background:
            "rgba(255,255,255,0.03)",

          border:
            "1px solid rgba(255,255,255,0.06)",

          borderRadius: "30px",

          padding: "28px",

          backdropFilter:
            "blur(18px)",

          boxShadow:
            "0 0 35px rgba(139,92,246,0.10)",
        }}
      >

        {/* TITLE */}
        <h1
          style={{
            color: "white",

            fontSize: "30px",

            fontWeight: "800",

            letterSpacing: "-1px",

            marginBottom: "10px",
          }}
        >
          Profile Verification
        </h1>

        <p
          style={{
            color: "#9ca3af",

            fontSize: "14px",

            lineHeight: "26px",

            marginBottom: "26px",
          }}
        >
          Submit your Reddit account
          for manual verification
          before accessing tasks.
        </p>

        {/* REDDIT USERNAME */}
        <div
          style={{
            marginBottom: "18px",
          }}
        >

          <p
            style={labelStyle}
          >
            Reddit Username
          </p>

          <div
            style={{
              display: "flex",

              alignItems: "center",

              background:
                "rgba(255,255,255,0.04)",

              border:
                "1px solid rgba(255,255,255,0.06)",

              borderRadius: "16px",

              paddingLeft: "16px",
            }}
          >

            <span
              style={{
                color: "#8b5cf6",

                fontSize: "14px",

                fontWeight: "600",
              }}
            >
              u/
            </span>

            <input
              type="text"

              placeholder="redditusername"

              value={
                redditUsername
              }

              onChange={(e) =>
                setRedditUsername(
                  e.target.value
                )
              }

              style={{
                ...inputInsideStyle,
              }}
            />

          </div>

        </div>

        {/* PROFILE LINK */}
        <div
          style={{
            marginBottom: "18px",
          }}
        >

          <p
            style={labelStyle}
          >
            Reddit Profile Link
          </p>

          <input
            type="text"

            placeholder="https://reddit.com/u/username"

            value={redditLink}

            onChange={(e) =>
              setRedditLink(
                e.target.value
              )
            }

            style={inputStyle}
          />

        </div>

        {/* DISCORD */}
        <div
          style={{
            background:
              "rgba(139,92,246,0.08)",

            border:
              "1px solid rgba(139,92,246,0.14)",

            borderRadius: "18px",

            padding: "18px",

            marginBottom: "24px",
          }}
        >

          <p
            style={{
              color: "white",

              fontSize: "14px",

              fontWeight: "600",

              marginBottom: "10px",
            }}
          >
            Discord Requirement
          </p>

          <p
            style={{
              color: "#9ca3af",

              fontSize: "13px",

              lineHeight: "24px",

              marginBottom: "14px",
            }}
          >
            Join our official Discord
            community before
            verification approval.
          </p>

          <a
            href="https://discord.gg/CGtfreSMP"

            target="_blank"

            rel="noreferrer"

            style={{
              display: "inline-block",

              color: "#c4b5fd",

              fontSize: "13px",

              marginBottom: "16px",

              textDecoration:
                "none",
            }}
          >
            Join Discord Server
          </a>

          <div
            style={{
              display: "flex",

              alignItems: "center",

              gap: "10px",
            }}
          >

            <input
              type="checkbox"

              checked={
                discordJoined
              }

              onChange={(e) =>
                setDiscordJoined(
                  e.target.checked
                )
              }
            />

            <p
              style={{
                color: "#d1d5db",

                fontSize: "13px",
              }}
            >
              I joined the Discord server
            </p>

          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={
            handleVerification
          }

          disabled={loading}

          style={{
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

            opacity:
              loading
                ? 0.7
                : 1,

            boxShadow:
              "0 0 30px rgba(139,92,246,0.18)",
          }}
        >
          {loading
            ? "Submitting..."
            : "Submit Verification"}
        </button>

      </div>

    </div>
  );
}

const labelStyle = {

  color: "#d1d5db",

  fontSize: "13px",

  marginBottom: "10px",

  fontWeight: "600",
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

const inputInsideStyle = {

  width: "100%",

  padding: "16px",

  border: "none",

  background: "transparent",

  color: "white",

  fontSize: "14px",

  outline: "none",
};

export default Verification;