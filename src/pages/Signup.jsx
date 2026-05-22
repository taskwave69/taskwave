import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

import { useNavigate, Link } from "react-router-dom";

function Signup() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      // Create Firestore user document
      await setDoc(doc(db, "users", user.uid), {

        email: user.email,

        pending: 0,

        withdrawable: 0,

        totalEarnings: 0,

        createdAt: new Date()

      });

      alert("Account Created!");

      navigate("/dashboard");

    } catch (error) {

      alert(error.message);

    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="bg-zinc-900 border border-cyan-500 rounded-3xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold text-cyan-400 text-center">
          Create Account
        </h1>

        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-5 mt-8"
        >

          <input
            type="email"
            placeholder="Email"
            className="bg-zinc-800 text-white p-4 rounded-xl outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-zinc-800 text-white p-4 rounded-xl outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-4 rounded-xl transition"
          >
            Signup
          </button>

        </form>

        <p className="text-zinc-400 text-center mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-cyan-400"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;