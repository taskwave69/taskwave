import {
  useState,
  useEffect
} from "react";

import {
  Link,
  useLocation
} from "react-router-dom";

import {
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import {
  auth
} from "../firebase";

function Sidebar() {

  const location =
    useLocation();

  const [open, setOpen] =
    useState(false);

  const [isAdmin, setIsAdmin] =
    useState(false);

  const allowedAdmins = [

    "jinoyfelix956@gmail.com",

    "alanjaison159@gmail.com",

    "nixondavidnd13@gmail.com",

  ];

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {

          if (user) {

            setIsAdmin(
              allowedAdmins.includes(
                user.email
              )
            );
          }
        }
      );

    return () =>
      unsubscribe();

  }, []);

  // LOGOUT
  const handleLogout =
    async () => {

      try {

        await signOut(auth);

        window.location.href =
          "/login";

      } catch (error) {

        console.log(error);

      }
    };

  const menuItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
    },

    {
      name: "Tasks",
      path: "/tasks",
    },

    {
      name: "Wallet",
      path: "/wallet",
    },

  ];

  return (

    <>

      {/* TOPBAR */}
      <div
        style={{
          position: "fixed",

          top: 0,

          left: 0,

          right: 0,

          height: "72px",

          background:
            "rgba(5,8,22,0.72)",

          backdropFilter:
            "blur(18px)",

          borderBottom:
            "1px solid rgba(255,255,255,0.05)",

          display: "flex",

          alignItems: "center",

          justifyContent:
            "space-between",

          padding:
            "0 20px",

          zIndex: 2000,
        }}
      >

        {/* LOGO */}
        <h1
          style={{
            color: "white",

            fontSize: "20px",

            fontWeight: "800",

            letterSpacing: "-1px",
          }}
        >
          TaskWave
        </h1>

        {/* MENU BUTTON */}
        <button
          onClick={() =>
            setOpen(true)
          }

          style={{
            width: "42px",

            height: "42px",

            borderRadius: "14px",

            border:
              "1px solid rgba(255,255,255,0.06)",

            background:
              "rgba(255,255,255,0.03)",

            color: "white",

            fontSize: "16px",

            cursor: "pointer",
          }}
        >
          ☰
        </button>

      </div>

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
              "rgba(0,0,0,0.5)",

            zIndex: 2500,
          }}
        />

      )}

      {/* SIDEBAR */}
      <div
        style={{
          position: "fixed",

          top: 0,

          right: open
            ? "0"
            : "-280px",

          width: "260px",

          height: "100vh",

          background:
            "#0b1120",

          borderLeft:
            "1px solid rgba(255,255,255,0.05)",

          backdropFilter:
            "blur(18px)",

          padding: "22px",

          transition:
            "0.35s",

          zIndex: 3000,

          display: "flex",

          flexDirection:
            "column",
        }}
      >

        {/* TOP */}
        <div
          style={{
            display: "flex",

            justifyContent:
              "space-between",

            alignItems: "center",

            marginBottom: "28px",
          }}
        >

          <h2
            style={{
              color: "white",

              fontSize: "18px",

              fontWeight: "700",
            }}
          >
            Menu
          </h2>

          <button
            onClick={() =>
              setOpen(false)
            }

            style={{
              width: "38px",

              height: "38px",

              borderRadius: "12px",

              border:
                "1px solid rgba(255,255,255,0.06)",

              background:
                "rgba(255,255,255,0.03)",

              color: "white",

              fontSize: "15px",

              cursor: "pointer",
            }}
          >
            ✕
          </button>

        </div>

        {/* MENU */}
        <div
          style={{
            display: "flex",

            flexDirection:
              "column",

            gap: "12px",
          }}
        >

          {menuItems.map(
            (item) => (

              <Link
                key={item.path}

                to={item.path}

                onClick={() =>
                  setOpen(false)
                }

                style={{
                  padding:
                    "15px 16px",

                  borderRadius:
                    "16px",

                  textDecoration:
                    "none",

                  fontSize: "13px",

                  fontWeight: "600",

                  color:
                    location.pathname ===
                    item.path
                      ? "white"
                      : "#9ca3af",

                  background:
                    location.pathname ===
                    item.path
                      ? "linear-gradient(135deg,#8b5cf6,#7c3aed)"
                      : "rgba(255,255,255,0.03)",

                  border:
                    "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {item.name}
              </Link>

            )
          )}

          {/* ADMIN */}
          {isAdmin && (

            <Link
              to="/admin"

              onClick={() =>
                setOpen(false)
              }

              style={{
                padding:
                  "15px 16px",

                borderRadius:
                  "16px",

                textDecoration:
                  "none",

                fontSize: "13px",

                fontWeight: "600",

                color:
                  location.pathname ===
                  "/admin"
                    ? "white"
                    : "#9ca3af",

                background:
                  location.pathname ===
                  "/admin"
                    ? "linear-gradient(135deg,#8b5cf6,#7c3aed)"
                    : "rgba(255,255,255,0.03)",

                border:
                  "1px solid rgba(255,255,255,0.05)",
              }}
            >
              Admin
            </Link>

          )}

        </div>

        {/* BOTTOM */}
        <div
          style={{
            marginTop: "auto",
          }}
        >

          <button
            onClick={
              handleLogout
            }

            style={{
              width: "100%",

              padding: "15px",

              border: "none",

              borderRadius: "16px",

              background:
                "rgba(239,68,68,0.12)",

              color: "#f87171",

              fontSize: "13px",

              fontWeight: "700",

              cursor: "pointer",
            }}
          >
            Logout
          </button>

        </div>

      </div>

    </>

  );
}

export default Sidebar;