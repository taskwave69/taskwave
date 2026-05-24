// src/pages/Login.jsx

import { Link, useNavigate } from "react-router-dom";

import {
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "../firebase";

function Login() {

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {

    try {

      const provider =
        new GoogleAuthProvider();

      await signInWithPopup(
        auth,
        provider
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top,#111827,#050816)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
        position: "relative",
      }}
    >

      {/* PURPLE GLOW */}
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background:
            "rgba(139,92,246,0.18)",
          borderRadius: "50%",
          top: "-100px",
          right: "-100px",
          filter: "blur(80px)",
        }}
      />

      {/* SECOND GLOW */}
      <div
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          background:
            "rgba(139,92,246,0.12)",
          borderRadius: "50%",
          bottom: "-80px",
          left: "-80px",
          filter: "blur(80px)",
        }}
      />

      {/* CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background:
            "rgba(255,255,255,0.03)",
          border:
            "1px solid rgba(255,255,255,0.06)",
          borderRadius: "34px",
          padding: "38px 26px",
          backdropFilter: "blur(18px)",
          boxShadow:
            "0 0 50px rgba(139,92,246,0.18)",
          position: "relative",
          zIndex: 5,
        }}
      >

        {/* LOGO */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "44px",
            fontWeight: "900",
            marginBottom: "14px",
            letterSpacing: "-1px",
          }}
        >
          <span style={{ color: "white" }}>
            Task
          </span>

          <span style={{ color: "#8b5cf6" }}>
            Wave
          </span>
        </h1>

        {/* SUBTEXT */}
        <p
          style={{
            textAlign: "center",
            color: "#9ca3af",
            fontSize: "15px",
            lineHeight: "28px",
            marginBottom: "40px",
          }}
        >
          Continue your earning journey
          and access premium social tasks.
        </p>

        {/* GOOGLE LOGIN BUTTON */}
        <button
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "20px",
            border: "none",
            background:
              "linear-gradient(135deg,#8b5cf6,#7c3aed)",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            boxShadow:
              "0 0 35px rgba(139,92,246,0.35)",
          }}
        >

          {/* GOOGLE ICON */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
            alt="google"
            style={{
              width: "22px",
              height: "22px",
              background: "white",
              borderRadius: "50%",
              padding: "2px",
            }}
          />

          Continue with Google

        </button>

        {/* DIVIDER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "32px 0",
            gap: "10px",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background:
                "rgba(255,255,255,0.08)",
            }}
          />

          <span
            style={{
              color: "#6b7280",
              fontSize: "12px",
              letterSpacing: "1px",
            }}
          >
            SECURE LOGIN
          </span>

          <div
            style={{
              flex: 1,
              height: "1px",
              background:
                "rgba(255,255,255,0.08)",
            }}
          />
        </div>

        {/* FEATURES */}
        <div
          style={{
            display: "grid",
            gap: "14px",
            marginBottom: "32px",
          }}
        >

          <div style={featureCard}>
            ⚡ Instant task access
          </div>

          <div style={featureCard}>
            💸 Binance & UPI withdrawals
          </div>

          <div style={featureCard}>
            🔒 Secure cloud authentication
          </div>

        </div>

        {/* SIGNUP */}
        <p
          style={{
            textAlign: "center",
            color: "#9ca3af",
            fontSize: "14px",
          }}
        >
          Don’t have an account?{" "}

          <Link
            to="/signup"
            style={{
              color: "#8b5cf6",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Create one
          </Link>

        </p>

      </div>

    </div>
  );
}

const featureCard = {
  background:
    "rgba(255,255,255,0.03)",
  border:
    "1px solid rgba(255,255,255,0.05)",
  padding: "16px",
  borderRadius: "16px",
  color: "#d1d5db",
  fontSize: "14px",
};

export default Login;