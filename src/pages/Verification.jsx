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
          "Please complete all fields"
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

            createdAt:
              Date.now(),
          },
          { merge: true }
        );

        navigate("/dashboard");

      } catch (error) {

        console.log(error);

        alert(
          "Something went wrong"
        );

      } finally {

        setLoading(false);

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

          maxWidth: "450px",

          background:
            "rgba(255,255,255,0.03)",

          border:
            "1px solid rgba(255,255,255,0.05)",

          borderRadius: "34px",

          padding: "40px",

          backdropFilter:
            "blur(22px)",

          boxShadow:
            "0 0 45px rgba(139,92,246,0.10)",
        }}
      >

        {/* TITLE */}
        <h1
          style={{
            color: "white",

            fontSize: "36px",

            fontWeight: "800",

            letterSpacing: "-1.5px",

            lineHeight: "44px",

            marginBottom: "16px",
          }}
        >
          Reddit Verification
        </h1>

        {/* SUBTITLE */}
        <p
          style={{
            color: "#9ca3af",

            fontSize: "14px",

            lineHeight: "30px",

            letterSpacing: "0.2px",

            marginBottom: "36px",

            fontWeight: "400",
          }}
        >
          Submit your Reddit profile
          for manual verification
          before accessing tasks
          and premium features.
        </p>

        {/* USERNAME */}
        <div
          style={{
            marginBottom: "22px",
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

              borderRadius: "18px",

              paddingLeft: "18px",
            }}
          >

            <span
              style={{
                color: "#8b5cf6",

                fontSize: "14px",

                fontWeight: "700",

                letterSpacing: "0.2px",
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

              style={
                inputInsideStyle
              }
            />

          </div>

        </div>

        {/* PROFILE LINK */}
        <div
          style={{
            marginBottom: "22px",
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

            borderRadius: "22px",

            padding: "22px",

            marginBottom: "28px",
          }}
        >

          <p
            style={{
              color: "white",

              fontSize: "15px",

              fontWeight: "700",

              marginBottom: "12px",

              letterSpacing: "-0.3px",
            }}
          >
            Discord Requirement
          </p>

          <p
            style={{
              color: "#9ca3af",

              fontSize: "13px",

              lineHeight: "26px",

              marginBottom: "18px",
            }}
          >
            Join the official
            TaskWave Discord server
            before requesting
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

              fontWeight: "600",

              marginBottom: "18px",

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

                letterSpacing: "0.1px",
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

            padding: "18px",

            border: "none",

            borderRadius: "20px",

            background:
              "linear-gradient(135deg,#8b5cf6,#7c3aed)",

            color: "white",

            fontSize: "14px",

            fontWeight: "700",

            letterSpacing: "0.3px",

            cursor: "pointer",

            boxShadow:
              "0 0 35px rgba(139,92,246,0.18)",

            transition:
              "0.3s",
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

  marginBottom: "12px",

  fontWeight: "600",

  letterSpacing: "0.1px",
};

const inputStyle = {

  width: "100%",

  padding: "18px",

  borderRadius: "18px",

  border:
    "1px solid rgba(255,255,255,0.06)",

  background:
    "rgba(255,255,255,0.04)",

  color: "white",

  fontSize: "14px",

  letterSpacing: "0.2px",

  outline: "none",

  fontWeight: "500",
};

const inputInsideStyle = {

  width: "100%",

  padding: "18px",

  border: "none",

  background: "transparent",

  color: "white",

  fontSize: "14px",

  letterSpacing: "0.2px",

  outline: "none",

  fontWeight: "500",
};

export default Verification;