// src/components/Sidebar.jsx

import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  signOut
} from "firebase/auth";

import { auth } from "../firebase";

function Sidebar() {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const handleLogout =
    async () => {

      try {

        await signOut(auth);

        navigate("/login");

      } catch (error) {

        console.log(error);

        alert("Logout Failed");

      }
    };

  const menuItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "🏠",
    },

    {
      name: "Tasks",
      path: "/tasks",
      icon: "⚡",
    },

    {
      name: "Wallet",
      path: "/wallet",
      icon: "💸",
    },

    {
      name: "History",
      path: "/history",
      icon: "📜",
    },

    {
      name: "Admin",
      path: "/admin",
      icon: "🛡️",
    },

  ];

  return (

    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#0f172a,#050816)",
        borderRight:
          "1px solid rgba(255,255,255,0.06)",
        padding: "26px 18px",
        display: "flex",
        flexDirection: "column",
        justifyContent:
          "space-between",
        position: "fixed",
        left: 0,
        top: 0,
        overflow: "hidden",
        zIndex: 999,
        backdropFilter: "blur(16px)",
      }}
    >

      {/* PURPLE GLOW */}
      <div
        style={{
          position: "absolute",
          width: "240px",
          height: "240px",
          background:
            "rgba(139,92,246,0.16)",
          borderRadius: "50%",
          top: "-80px",
          left: "-80px",
          filter: "blur(60px)",
        }}
      />

      {/* TOP */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
        }}
      >

        {/* LOGO */}
        <h1
          style={{
            fontSize: "38px",
            fontWeight: "900",
            marginBottom: "45px",
            letterSpacing: "-1px",
          }}
        >

          <span style={{ color: "white" }}>
            Task
          </span>

          <span
            style={{
              color: "#8b5cf6",
              textShadow:
                "0 0 20px rgba(139,92,246,0.8)",
            }}
          >
            Wave
          </span>

        </h1>

        {/* MENU */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >

          {menuItems.map((item) => (

            <Link
              key={item.name}
              to={item.path}
              style={{
                textDecoration: "none",
              }}
            >

              <div
                style={{
                  padding: "16px 18px",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  fontSize: "15px",
                  fontWeight: "600",
                  transition: "0.3s",

                  background:
                    location.pathname ===
                    item.path

                      ? "linear-gradient(135deg,#8b5cf6,#7c3aed)"

                      : "rgba(255,255,255,0.03)",

                  color:
                    location.pathname ===
                    item.path

                      ? "white"

                      : "#d1d5db",

                  border:
                    location.pathname ===
                    item.path

                      ? "1px solid rgba(139,92,246,0.4)"

                      : "1px solid rgba(255,255,255,0.04)",

                  boxShadow:
                    location.pathname ===
                    item.path

                      ? "0 0 30px rgba(139,92,246,0.25)"

                      : "none",
                }}
              >

                <span
                  style={{
                    fontSize: "18px",
                  }}
                >
                  {item.icon}
                </span>

                {item.name}

              </div>

            </Link>

          ))}

        </div>

      </div>

      {/* BOTTOM */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
        }}
      >

        {/* DISCORD */}
        <a
          href="https://discord.gg/CGtfreSMP"
          target="_blank"
          rel="noreferrer"
          style={{
            textDecoration: "none",
          }}
        >

          <div
            style={{
              padding: "16px",
              borderRadius: "18px",
              background:
                "rgba(139,92,246,0.08)",
              border:
                "1px solid rgba(139,92,246,0.16)",
              color: "#c4b5fd",
              fontWeight: "600",
              marginBottom: "16px",
              textAlign: "center",
              boxShadow:
                "0 0 25px rgba(139,92,246,0.12)",
            }}
          >
            💬 Join Discord
          </div>

        </a>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "17px",
            border: "none",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg,#ef4444,#dc2626)",
            color: "white",
            fontWeight: "bold",
            fontSize: "15px",
            cursor: "pointer",
            boxShadow:
              "0 0 30px rgba(239,68,68,0.25)",
          }}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;