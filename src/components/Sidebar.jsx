// src/components/Sidebar.jsx

import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  signOut
} from "firebase/auth";

import {
  useState
} from "react";

import { auth } from "../firebase";

function Sidebar() {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const [open, setOpen] =
    useState(false);

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

    <>

      {/* PREMIUM MENU BUTTON */}
      <button
        onClick={() =>
          setOpen(true)
        }
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 2000,

          width: "46px",
          height: "46px",

          borderRadius: "14px",

          border:
            "1px solid rgba(255,255,255,0.06)",

          background:
            "rgba(15,23,42,0.82)",

          backdropFilter:
            "blur(14px)",

          boxShadow:
            "0 0 30px rgba(139,92,246,0.12)",

          cursor: "pointer",

          display: open
            ? "none"
            : "flex",

          alignItems: "center",
          justifyContent: "center",

          padding: 0,
        }}
      >

        {/* LINES */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >

          <div
            style={{
              width: "18px",
              height: "2px",
              borderRadius: "20px",
              background:
                "linear-gradient(90deg,#ffffff,#8b5cf6)",
            }}
          />

          <div
            style={{
              width: "14px",
              height: "2px",
              borderRadius: "20px",
              background:
                "linear-gradient(90deg,#ffffff,#8b5cf6)",
            }}
          />

          <div
            style={{
              width: "18px",
              height: "2px",
              borderRadius: "20px",
              background:
                "linear-gradient(90deg,#ffffff,#8b5cf6)",
            }}
          />

        </div>

      </button>

      {/* OVERLAY */}
      {open && (

        <div
          onClick={() =>
            setOpen(false)
          }
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.55)",
            backdropFilter:
              "blur(3px)",
            zIndex: 1500,
          }}
        />

      )}

      {/* SIDEBAR */}
      <div
        style={{
          width: "245px",
          minHeight: "100vh",
          background:
            "rgba(8,15,32,0.98)",

          backdropFilter:
            "blur(18px)",

          borderRight:
            "1px solid rgba(255,255,255,0.05)",

          padding: "22px 16px",

          position: "fixed",

          left: open
            ? "0"
            : "-270px",

          top: 0,

          zIndex: 1600,

          display: "flex",

          flexDirection: "column",

          justifyContent:
            "space-between",

          fontFamily:
            "Inter, sans-serif",

          transition:
            "0.35s ease",
        }}
      >

        {/* TOP */}
        <div>

          {/* HEADER */}
          <div
            style={{
              display: "flex",

              justifyContent:
                "space-between",

              alignItems: "center",

              marginBottom: "34px",
            }}
          >

            {/* LOGO */}
            <div>

              <h1
                style={{
                  fontSize: "30px",
                  fontWeight: "800",
                  letterSpacing:
                    "-1px",
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
                    color:
                      "#8b5cf6",
                  }}
                >
                  Wave
                </span>

              </h1>

              <p
                style={{
                  color: "#6b7280",
                  fontSize: "11px",
                  marginTop: "-4px",
                }}
              >
                Premium earning platform
              </p>

            </div>

            {/* CLOSE */}
            <button
              onClick={() =>
                setOpen(false)
              }
              style={{
                width: "38px",
                height: "38px",

                borderRadius:
                  "12px",

                border:
                  "1px solid rgba(255,255,255,0.08)",

                background:
                  "rgba(255,255,255,0.04)",

                color: "white",

                fontSize: "16px",

                cursor: "pointer",
              }}
            >
              ✕
            </button>

          </div>

          {/* BALANCE */}
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
              flexDirection:
                "column",
              gap: "10px",
            }}
          >

            {menuItems.map(
              (item) => (

                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() =>
                    setOpen(false)
                  }
                  style={{
                    textDecoration:
                      "none",
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      alignItems:
                        "center",

                      gap: "14px",

                      padding:
                        "14px 16px",

                      borderRadius:
                        "16px",

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
                        fontSize:
                          "15px",
                      }}
                    >
                      {item.icon}
                    </span>

                    <span
                      style={{
                        fontSize:
                          "14px",

                        fontWeight:
                          "500",
                      }}
                    >
                      {item.name}
                    </span>

                  </div>

                </Link>

              )
            )}

            {/* LOGOUT */}
            <button
              onClick={
                handleLogout
              }
              style={{
                marginTop: "8px",

                width: "100%",

                padding: "14px",

                borderRadius:
                  "16px",

                border:
                  "1px solid rgba(239,68,68,0.18)",

                background:
                  "rgba(239,68,68,0.08)",

                color: "#f87171",

                fontSize: "14px",

                fontWeight: "600",

                cursor: "pointer",
              }}
            >
              Logout
            </button>

          </div>

        </div>

        {/* BOTTOM */}
        <div>

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

                borderRadius:
                  "16px",

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

    </>

  );
}

export default Sidebar;