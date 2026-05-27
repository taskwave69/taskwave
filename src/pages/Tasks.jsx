// src/pages/Tasks.jsx

import {
  useEffect,
  useState
} from "react";

import Sidebar from "../components/Sidebar";

import {
  auth,
  db
} from "../firebase";

import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";

function Tasks() {

  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH TASKS
  const fetchTasks =
    async () => {

      try {

        const user =
          auth.currentUser;

        const q =
          query(
            collection(
              db,
              "tasks"
            ),

            where(
              "claimed",
              "==",
              false
            )
          );

        const snapshot =
          await getDocs(q);

        const taskList =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        // REMOVE OWN CLAIMED TASKS
        const filtered =
          taskList.filter(
            (task) =>
              task.claimedBy !==
              user.uid
          );

        setTasks(filtered);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {

    fetchTasks();

  }, []);

  // CLAIM TASK
  const claimTask =
    async (taskId) => {

      try {

        const user =
          auth.currentUser;

        // ADD CLAIM
        await addDoc(
          collection(
            db,
            "taskClaims"
          ),
          {
            taskId,

            userId:
              user.uid,

            status:
              "pending",

            createdAt:
              Date.now(),
          }
        );

        // HIDE TASK
        await updateDoc(
          doc(
            db,
            "tasks",
            taskId
          ),
          {
            claimed: true,

            claimedBy:
              user.uid,
          }
        );

        fetchTasks();

      } catch (error) {

        console.log(error);

      }
    };

  // REJECT TASK
  const rejectTask =
    async (taskId) => {

      try {

        await updateDoc(
          doc(
            db,
            "tasks",
            taskId
          ),
          {
            rejected: true,
          }
        );

        setTasks(
          tasks.filter(
            (task) =>
              task.id !== taskId
          )
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

        paddingTop: "95px",

        paddingLeft: "20px",

        paddingRight: "20px",

        paddingBottom: "40px",

        color: "white",

        fontFamily:
          "Inter, sans-serif",
      }}
    >

      <Sidebar />

      {/* HEADER */}
      <div
        style={{
          marginBottom: "24px",
        }}
      >

        <h1
          style={{
            fontSize: "28px",

            fontWeight: "800",

            letterSpacing: "-1px",

            marginBottom: "8px",
          }}
        >
          Tasks
        </h1>

        <p
          style={{
            color: "#9ca3af",

            fontSize: "12px",

            lineHeight: "24px",
          }}
        >
          Complete tasks and earn rewards.
        </p>

      </div>

      {/* LOADING */}
      {loading && (

        <p
          style={{
            color: "#9ca3af",

            fontSize: "13px",
          }}
        >
          Loading tasks...
        </p>

      )}

      {/* EMPTY */}
      {!loading &&
        tasks.length === 0 && (

          <div
            style={{
              background:
                "rgba(255,255,255,0.03)",

              border:
                "1px solid rgba(255,255,255,0.05)",

              borderRadius: "24px",

              padding: "26px",

              textAlign: "center",
            }}
          >

            <p
              style={{
                color: "#9ca3af",

                fontSize: "13px",

                lineHeight: "26px",
              }}
            >
              No available tasks right now.
            </p>

          </div>

        )}

      {/* TASK LIST */}
      <div
        style={{
          display: "grid",

          gap: "18px",
        }}
      >

        {tasks.map((task) => (

          <div
            key={task.id}

            style={{
              background:
                "rgba(255,255,255,0.03)",

              border:
                "1px solid rgba(255,255,255,0.05)",

              borderRadius: "26px",

              padding: "22px",

              backdropFilter:
                "blur(20px)",
            }}
          >

            {/* IMAGE */}
            {task.image && (

              <img
                src={task.image}

                alt="task"

                style={{
                  width: "100%",

                  height: "180px",

                  objectFit: "cover",

                  borderRadius: "18px",

                  marginBottom: "18px",
                }}
              />

            )}

            {/* TITLE */}
            <h2
              style={{
                fontSize: "18px",

                fontWeight: "700",

                marginBottom: "10px",

                letterSpacing: "-0.5px",
              }}
            >
              {task.title}
            </h2>

            {/* DESCRIPTION */}
            <p
              style={{
                color: "#9ca3af",

                fontSize: "12px",

                lineHeight: "24px",

                marginBottom: "18px",
              }}
            >
              {task.description}
            </p>

            {/* INSTRUCTIONS */}
            <div
              style={{
                background:
                  "rgba(139,92,246,0.08)",

                border:
                  "1px solid rgba(139,92,246,0.12)",

                borderRadius: "18px",

                padding: "16px",

                marginBottom: "18px",
              }}
            >

              <p
                style={{
                  color: "#c4b5fd",

                  fontSize: "11px",

                  marginBottom: "10px",

                  letterSpacing: "1px",
                }}
              >
                INSTRUCTIONS
              </p>

              <p
                style={{
                  color: "#d1d5db",

                  fontSize: "12px",

                  lineHeight: "24px",
                }}
              >
                {task.instructions}
              </p>

            </div>

            {/* FOOTER */}
            <div
              style={{
                display: "flex",

                justifyContent:
                  "space-between",

                alignItems: "center",

                gap: "12px",
              }}
            >

              <div>

                <p
                  style={{
                    color: "#9ca3af",

                    fontSize: "11px",

                    marginBottom: "6px",
                  }}
                >
                  TASK REWARD
                </p>

                <h3
                  style={{
                    color: "white",

                    fontSize: "22px",

                    fontWeight: "800",
                  }}
                >
                  ${task.amount}
                </h3>

              </div>

              {/* BUTTONS */}
              <div
                style={{
                  display: "flex",

                  gap: "10px",
                }}
              >

                <button
                  onClick={() =>
                    rejectTask(
                      task.id
                    )
                  }

                  style={{
                    padding:
                      "12px 16px",

                    border: "none",

                    borderRadius:
                      "16px",

                    background:
                      "rgba(239,68,68,0.12)",

                    color: "#f87171",

                    fontSize: "12px",

                    fontWeight: "700",

                    cursor: "pointer",
                  }}
                >
                  Reject
                </button>

                <button
                  onClick={() =>
                    claimTask(
                      task.id
                    )
                  }

                  style={{
                    padding:
                      "12px 18px",

                    border: "none",

                    borderRadius:
                      "16px",

                    background:
                      "linear-gradient(135deg,#8b5cf6,#7c3aed)",

                    color: "white",

                    fontSize: "12px",

                    fontWeight: "700",

                    cursor: "pointer",

                    boxShadow:
                      "0 0 25px rgba(139,92,246,0.15)",
                  }}
                >
                  Claim
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Tasks;