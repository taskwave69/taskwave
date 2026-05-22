import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-2xl w-[350px] border border-cyan-500"
      >
        <h1 className="text-3xl font-bold mb-6 text-cyan-400 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-zinc-800 mb-4 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-zinc-800 mb-6 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-cyan-400 text-black py-3 rounded-lg font-bold hover:bg-cyan-300 transition">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;