// src/pages/Login.jsx

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  useState
} from "react";

import { auth } from "../firebase";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  // GOOGLE LOGIN
  const handleGoogleLogin =
    async () => {

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

        alert("Google Login Failed");

      }
    };

  // EMAIL LOGIN
  const handleEmailLogin =
    async () => {

      try {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        navigate("/dashboard");

      } catch (error) {

        console.log(error);

        alert("Invalid Email or Password");

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

      {/* GLOW */}
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
          }}
        >
          <span style={{ color: "white" }}>
            Task
          </span>

          <span style={{ color: "#8b5cf6" }}>
            Wave
          </span>
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#9ca3af",
            fontSize: "15px",
            lineHeight: "28px",
            marginBottom: "35px",
          }}
        >
          Login to continue earning
          through premium social tasks.
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={inputStyle}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={inputStyle}
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={handleEmailLogin}
          style={mainButton}
        >
          Login
        </button>

        {/* DIVIDER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "28px 0",
            gap: "10px",
          }}
        >
          <div style={line} />

          <span
            style={{
              color: "#6b7280",
              fontSize: "12px",
            }}
          >
            OR CONTINUE WITH
          </span>

          <div style={line} />
        </div>

        {/* GOOGLE */}
        <button
          onClick={handleGoogleLogin}
          style={googleButton}
        >

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

        {/* FEATURES */}
        <div
          style={{
            display: "grid",
            gap: "14px",
            marginTop: "30px",
            marginBottom: "30px",
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

const inputStyle = {
  width: "100%",
  padding: "18px",
  borderRadius: "18px",
  border:
    "1px solid rgba(255,255,255,0.06)",
  background:
    "rgba(255,255,255,0.03)",
  color: "white",
  fontSize: "15px",
  marginBottom: "16px",
  outline: "none",
  boxSizing: "border-box",
};

const mainButton = {
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
  boxShadow:
    "0 0 35px rgba(139,92,246,0.35)",
};

const googleButton = {
  width: "100%",
  padding: "18px",
  borderRadius: "20px",
  border:
    "1px solid rgba(255,255,255,0.06)",
  background:
    "rgba(255,255,255,0.03)",
  color: "white",
  fontSize: "15px",
  fontWeight: "bold",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
};

const line = {
  flex: 1,
  height: "1px",
  background:
    "rgba(255,255,255,0.08)",
};

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