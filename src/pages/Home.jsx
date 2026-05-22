import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="bg-black text-white min-h-screen">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-gray-800">

        <h1 className="text-3xl font-bold text-cyan-400">
          TaskWave
        </h1>

        <Link
          to="/login"
          className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2 rounded-xl font-semibold transition"
        >
          Login
        </Link>

      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-40 px-6">

        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
          Complete Tasks.
          <br />
          Earn Rewards.
        </h1>

        <p className="text-gray-400 text-lg mt-6 max-w-2xl">
          A modern reward platform where users complete tasks,
          earn money, and grow together.
        </p>

        <div className="flex gap-4 mt-10">

          <Link
            to="/signup"
            className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-2xl font-bold transition"
          >
            Get Started
          </Link>

          <button className="border border-gray-700 hover:border-cyan-400 px-8 py-4 rounded-2xl transition">
            Learn More
          </button>

        </div>

      </section>

    </div>
  )
}

export default Home