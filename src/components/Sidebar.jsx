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

      }
    };

  const menuItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "⌂",
    },

    {
      name: "Tasks",
      path: "/tasks",
      icon: "◉",
    },

    {
      name: "Wallet",
      path: "/wallet",
      icon: "◈",
    },

    {
      name: "History",
      path: "/history",
      icon: "◎",
    },

    {
      name: "Admin",
      path: "/admin",
      icon: "◌",
    },

  ];

  return (

    <div
      style={{
        width: "245px",
        minHeight: "100vh",
        background:
          "rgba(8,15,32,0.96)",
        backdropFilter:
          "blur(18px)",
        borderRight:
          "1px solid rgba(255,255,255,0.05)",
        padding: "22px 16px",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        justifyContent:
          "space-between",
        fontFamily:
          "Inter, sans-serif",
      }}
    >

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div
          style={{
            marginBottom: "38px",
          }}
        >

          <h1
            style={{
              fontSize: "30px",
              fontWeight: "800",
              letterSpacing: "-1px",
            }}
          >

            <span
              style={{
                color: "white",
              }}
            >
              Task
            </span>

            <span
              style={{
                color: "#8b5cf6",
              }}
            >
              Wave
            </span>

          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "12px",
              marginTop: "-5px",
            }}
          >
            Premium earning platform
          </p>

        </div>

        {/* BALANCE CARD */}
        <div
          style={{
            background:
              "linear-gradient(135deg,#8b5cf6,#7c3aed)",
            padding: "18px",
            borderRadius: "20px",
            marginBottom: "28px",
            boxShadow:
              "0 0 30px rgba(139,92,246,0.22)",
          }}
        >

          <p
            style={{
              fontSize: "12px",
              opacity: 0.8,
              marginBottom: "8px",
            }}
          >
            Balance
          </p>

          <h2
            style={{
              fontSize: "28px",
              fontWeight: "800",
            }}
          >
            $0.00
          </h2>

        </div>

        {/* MENU */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >

          {menuItems.map((item) => (

            <Link
              key={item.name}
              to={item.path}
              style={{
                textDecoration:
                  "none",
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding:
                    "14px 16px",
                  borderRadius:
                    "16px",
                  transition:
                    "0.25s ease",

                  background:
                    location.pathname ===
                    item.path

                      ? "rgba(139,92,246,0.14)"

                      : "transparent",

                  border:
                    location.pathname ===
                    item.path

                      ? "1px solid rgba(139,92,246,0.22)"

                      : "1px solid transparent",

                  color:
                    location.pathname ===
                    item.path

                      ? "#ffffff"

                      : "#9ca3af",
                }}
              >

                <span
                  style={{
                    fontSize: "15px",
                  }}
                >
                  {item.icon}
                </span>

                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {item.name}
                </span>

              </div>

            </Link>

          ))}

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            style={{
              marginTop: "8px",
              width: "100%",
              padding: "14px",
              borderRadius: "16px",
              border:
                "1px solid rgba(239,68,68,0.18)",
              background:
                "rgba(239,68,68,0.08)",
              color: "#f87171",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.25s",
            }}
          >
            Logout
          </button>

        </div>

      </div>

      {/* BOTTOM */}
      <div>

        {/* DISCORD */}
        <a
          href="https://discord.gg/CGtfreSMP"
          target="_blank"
          rel="noreferrer"
          style={{
            textDecoration:
              "none",
          }}
        >

          <div
            style={{
              padding: "14px",
              borderRadius: "16px",
              background:
                "rgba(139,92,246,0.08)",
              border:
                "1px solid rgba(139,92,246,0.16)",
              textAlign: "center",
              color: "#c4b5fd",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            Join Discord
          </div>

        </a>

      </div>

    </div>
  );
}

export default Sidebar;