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

        alert(
          "Verification submitted. Wait for admin approval."
        );

        navigate("/login");

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
        }}
      >

        <h1
          style={{
            color: "white",

            fontSize: "30px",

            fontWeight: "800",

            marginBottom: "10px",
          }}
        >
          Reddit Verification
        </h1>

        <p
          style={{
            color: "#9ca3af",

            fontSize: "14px",

            lineHeight: "26px",

            marginBottom: "26px",
          }}
        >
          Verify your Reddit profile
          before accessing tasks.
        </p>

        <input
          placeholder="Reddit Username"

          value={redditUsername}

          onChange={(e) =>
            setRedditUsername(
              e.target.value
            )
          }

          style={inputStyle}
        />

        <input
          placeholder="Reddit Profile Link"

          value={redditLink}

          onChange={(e) =>
            setRedditLink(
              e.target.value
            )
          }

          style={inputStyle}
        />

        <div
          style={{
            marginBottom: "22px",
          }}
        >

          <a
            href="https://discord.gg/CGtfreSMP"

            target="_blank"

            rel="noreferrer"

            style={{
              color: "#a78bfa",

              fontSize: "14px",

              textDecoration:
                "none",
            }}
          >
            Join Discord Server
          </a>

        </div>

        <div
          style={{
            display: "flex",

            alignItems: "center",

            gap: "10px",

            marginBottom: "24px",
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

        <button
          onClick={
            handleVerification
          }

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
          }}
        >
          Submit Verification
        </button>

      </div>

    </div>
  );
}

const inputStyle = {

  width: "100%",

  padding: "16px",

  marginBottom: "16px",

  borderRadius: "16px",

  border:
    "1px solid rgba(255,255,255,0.06)",

  background:
    "rgba(255,255,255,0.04)",

  color: "white",

  fontSize: "14px",

  outline: "none",
};

export default Verification;