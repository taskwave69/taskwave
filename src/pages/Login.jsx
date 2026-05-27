import { useState } from "react";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  auth,
  db
} from "../firebase";

import {
  useNavigate,
  Link
} from "react-router-dom";

function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // EMAIL LOGIN
  const handleLogin =
    async () => {

      if (
        !email ||
        !password
      ) {

        alert(
          "Fill all fields"
        );

        return;
      }

      try {

        setLoading(true);

        // LOGIN FIRST
        const userCredential =
          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

        const user =
          userCredential.user;

        // CHECK IF REGISTERED
        const userRef =
          doc(
            db,
            "users",
            user.uid
          );

        const userSnap =
          await getDoc(
            userRef
          );

        // NOT REGISTERED
        if (
          !userSnap.exists()
        ) {

          await auth.signOut();

          alert(
            "Account not registered. Please sign up first."
          );

          setLoading(false);

          return;
        }

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Invalid account or password"
        );

      } finally {

        setLoading(false);

      }
    };

  // GOOGLE LOGIN
  const handleGoogleLogin =
    async () => {

      try {

        const provider =
          new GoogleAuthProvider();

        const result =
          await signInWithPopup(
            auth,
            provider
          );

        const user =
          result.user;

        // CHECK IF REGISTERED
        const userRef =
          doc(
            db,
            "users",
            user.uid
          );

        const userSnap =
          await getDoc(
            userRef
          );

        // NOT REGISTERED
        if (
          !userSnap.exists()
        ) {

          await auth.signOut();

          alert(
            "Google account not registered. Please sign up first."
          );

          return;
        }

        navigate(
          "/dashboard"
        );

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

          maxWidth: "440px",

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

            marginBottom: "14px",
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            color: "#9ca3af",

            fontSize: "14px",

            lineHeight: "30px",

            marginBottom: "34px",
          }}
        >
          Sign in to continue using TaskWave.
        </p>

        {/* EMAIL */}
        <div
          style={{
            marginBottom: "18px",
          }}
        >

          <p style={labelStyle}>
            Email Address
          </p>

          <input
            type="email"

            placeholder="Enter your email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }

            style={inputStyle}
          />

        </div>

        {/* PASSWORD */}
        <div
          style={{
            marginBottom: "28px",
          }}
        >

          <p style={labelStyle}>
            Password
          </p>

          <input
            type="password"

            placeholder="Enter your password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            style={inputStyle}
          />

        </div>

        {/* LOGIN */}
        <button
          onClick={handleLogin}

          disabled={loading}

          style={buttonStyle}
        >
          {loading
            ? "Signing In..."
            : "Sign In"}
        </button>

        {/* DIVIDER */}
        <div
          style={{
            display: "flex",

            alignItems: "center",

            gap: "12px",

            marginTop: "28px",

            marginBottom: "28px",
          }}
        >

          <div style={dividerStyle}></div>

          <p
            style={{
              color: "#6b7280",

              fontSize: "12px",
            }}
          >
            OR
          </p>

          <div style={dividerStyle}></div>

        </div>

        {/* GOOGLE */}
        <button
          onClick={
            handleGoogleLogin
          }

          style={googleButton}
        >
          Continue with Google
        </button>

        {/* SIGNUP */}
        <p
          style={{
            color: "#9ca3af",

            fontSize: "13px",

            textAlign: "center",

            marginTop: "30px",

            lineHeight: "26px",
          }}
        >
          New to TaskWave?{" "}

          <Link
            to="/signup"

            style={{
              color: "#a78bfa",

              textDecoration:
                "none",

              fontWeight: "600",
            }}
          >
            Create account
          </Link>

        </p>

      </div>

    </div>
  );
}

const labelStyle = {

  color: "#d1d5db",

  fontSize: "13px",

  marginBottom: "12px",

  fontWeight: "600",
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

  outline: "none",
};

const buttonStyle = {

  width: "100%",

  padding: "18px",

  border: "none",

  borderRadius: "20px",

  background:
    "linear-gradient(135deg,#8b5cf6,#7c3aed)",

  color: "white",

  fontSize: "14px",

  fontWeight: "700",

  cursor: "pointer",

  boxShadow:
    "0 0 35px rgba(139,92,246,0.18)",
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

  fontSize: "14px",

  fontWeight: "600",

  cursor: "pointer",
};

const dividerStyle = {

  flex: 1,

  height: "1px",

  background:
    "rgba(255,255,255,0.06)",
};

export default Login;