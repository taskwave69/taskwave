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

  const [userData, setUserData] =
    useState(null);

  useEffect(() => {

    const checkUser =
      async () => {

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

        if (
          !data.approved
        ) {

          navigate(
            "/verification"
          );

          return;
        }

        setUserData(data);
      };

    checkUser();

  }, []);

  if (!userData) {

    return null;

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

      <h1
        style={{
          fontSize: "28px",
          marginBottom: "18px",
        }}
      >
        Dashboard
      </h1>

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
          VERIFIED REDDIT
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