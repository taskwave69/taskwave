import Sidebar from "../components/Sidebar";

import {
  useEffect,
  useState
} from "react";

import {
  auth,
  db
} from "../firebase";

import {
  doc,
  getDoc
} from "firebase/firestore";

import {
  useNavigate
} from "react-router-dom";

function Dashboard() {

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [userData, setUserData] =
    useState(null);

  const [pending, setPending] =
    useState(false);

  useEffect(() => {

    const checkUser =
      async () => {

        try {

          const user =
            auth.currentUser;

          if (!user) {

            navigate("/login");

            return;
          }

          const docRef =
            doc(
              db,
              "users",
              user.uid
            );

          const docSnap =
            await getDoc(
              docRef
            );

          // NEVER VERIFIED
          if (
            !docSnap.exists()
          ) {

            navigate(
              "/verification"
            );

            return;
          }

          const data =
            docSnap.data();

          // WAITING FOR ADMIN
          if (
            !data.approved
          ) {

            setPending(true);

            setLoading(false);

            return;
          }

          // APPROVED
          setUserData(data);

          setLoading(false);

        } catch (error) {

          console.log(error);

        }
      };

    checkUser();

  }, []);

  // LOADING
  if (loading) {

    return null;

  }

  // WAITING APPROVAL SCREEN
  if (pending) {

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

            maxWidth: "420px",

            background:
              "rgba(255,255,255,0.03)",

            border:
              "1px solid rgba(255,255,255,0.06)",

            borderRadius: "28px",

            padding: "30px",

            textAlign: "center",

            backdropFilter:
              "blur(18px)",
          }}
        >

          <h1
            style={{
              color: "white",

              fontSize: "30px",

              fontWeight: "700",

              marginBottom: "14px",
            }}
          >
            Verification Pending
          </h1>

          <p
            style={{
              color: "#9ca3af",

              fontSize: "14px",

              lineHeight: "28px",
            }}
          >
            Your Reddit profile has been
            submitted for manual review.
            Please wait for an admin
            approval to access TaskWave.
          </p>

        </div>

      </div>

    );
  }

  return (

    <div
      style={{
        minHeight: "100vh",

        background:
          "radial-gradient(circle at top,#111827,#050816)",

        color: "white",

        fontFamily:
          "Inter, sans-serif",

        paddingTop: "95px",

        paddingLeft: "20px",

        paddingRight: "20px",
      }}
    >

      <Sidebar />

      {/* HEADER */}
      <div
        style={{
          marginBottom: "20px",
        }}
      >

        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            marginBottom: "6px",
          }}
        >
          Dashboard
        </h1>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "13px",
          }}
        >
          Welcome back to TaskWave.
        </p>

      </div>

      {/* VERIFIED REDDIT */}
      <div
        style={{
          background:
            "rgba(139,92,246,0.10)",

          border:
            "1px solid rgba(139,92,246,0.18)",

          borderRadius: "22px",

          padding: "20px",

          marginBottom: "18px",
        }}
      >

        <p
          style={{
            color: "#c4b5fd",

            fontSize: "13px",

            marginBottom: "10px",
          }}
        >
          VERIFIED REDDIT ACCOUNT
        </p>

        <h2
          style={{
            fontSize: "24px",

            marginBottom: "10px",
          }}
        >
          u/{userData.redditUsername}
        </h2>

        <a
          href={
            userData.redditLink
          }

          target="_blank"

          rel="noreferrer"

          style={{
            color: "#a78bfa",

            textDecoration:
              "none",

            fontSize: "13px",
          }}
        >
          Open Reddit Profile
        </a>

      </div>

    </div>
  );
}

export default Dashboard;