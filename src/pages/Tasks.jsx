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
  doc,
  updateDoc,
} from "firebase/firestore";

function Tasks() {

  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedTask, setSelectedTask] =
    useState(null);

  const [proof, setProof] =
    useState("");

  // FETCH TASKS
  const fetchTasks =
    async () => {

      try {

        const snapshot =
          await getDocs(
            collection(
              db,
              "tasks"
            )
          );

        const taskList =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        // SHOW ONLY AVAILABLE TASKS
        const filtered =
          taskList.filter(
            (task) =>
              task.claimed !== true
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

  // OPEN TASK
  const openTask =
    (task) => {

      setSelectedTask(task);

    };

  // SUBMIT TASK
  const submitTask =
    async () => {

      try {

        const user =
          auth.currentUser;

        await addDoc(
          collection(
            db,
            "taskClaims"
          ),
          {
            taskId:
              selectedTask.id,

            userId:
              user.uid,

            proof,

            amount:
              selectedTask.amount,

            status:
              "pending",

            createdAt:
              Date.now(),
          }
        );

        // HIDE TASK GLOBALLY
        await updateDoc(
          doc(
            db,
            "tasks",
            selectedTask.id
          ),
          {
            claimed: true,

            claimedBy:
              user.uid,

            pendingReview:
              true,

            proof,
          }
        );

        // REMOVE FROM UI
        setTasks(
          tasks.filter(
            (task) =>
              task.id !==
              selectedTask.id
          )
        );

        setSelectedTask(null);

        setProof("");

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
          }}
        >
          Available community tasks
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

              borderRadius: "22px",

              padding: "28px",

              textAlign: "center",
            }}
          >

            <p
              style={{
                color: "#9ca3af",

                fontSize: "13px",
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

          gap: "14px",
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

              borderRadius: "22px",

              padding: "18px",

              display: "flex",

              justifyContent:
                "space-between",

              alignItems: "center",
            }}
          >

            {/* LEFT */}
            <div>

              <p
                style={{
                  color: "#8b5cf6",

                  fontSize: "11px",

                  marginBottom: "6px",
                }}
              >
                {task.subreddit}
              </p>

              <h2
                style={{
                  fontSize: "15px",

                  fontWeight: "700",

                  marginBottom: "6px",
                }}
              >
                {task.title}
              </h2>

              <p
                style={{
                  color: "#9ca3af",

                  fontSize: "11px",
                }}
              >
                Reward: $
                {task.amount}
              </p>

            </div>

            {/* VIEW */}
            <button
              onClick={() =>
                openTask(task)
              }

              style={{
                border: "none",

                padding:
                  "12px 16px",

                borderRadius:
                  "14px",

                background:
                  "linear-gradient(135deg,#8b5cf6,#7c3aed)",

                color: "white",

                fontSize: "12px",

                fontWeight: "700",

                cursor: "pointer",
              }}
            >
              View
            </button>

          </div>

        ))}

      </div>

      {/* TASK DETAIL */}
      {selectedTask && (

        <div
          style={{
            position: "fixed",

            inset: 0,

            background:
              "rgba(0,0,0,0.72)",

            backdropFilter:
              "blur(6px)",

            display: "flex",

            justifyContent:
              "center",

            alignItems: "center",

            padding: "20px",

            zIndex: 3000,
          }}
        >

          <div
            style={{
              width: "100%",

              maxWidth: "520px",

              background:
                "#0f172a",

              border:
                "1px solid rgba(255,255,255,0.06)",

              borderRadius: "28px",

              padding: "24px",
            }}
          >

            {/* IMAGE */}
            {selectedTask.image && (

              <img
                src={
                  selectedTask.image
                }

                alt="task"

                style={{
                  width: "100%",

                  height: "220px",

                  objectFit: "cover",

                  borderRadius: "18px",

                  marginBottom: "18px",
                }}
              />

            )}

            <p
              style={{
                color: "#8b5cf6",

                fontSize: "11px",

                marginBottom: "8px",
              }}
            >
              {
                selectedTask.subreddit
              }
            </p>

            <h2
              style={{
                fontSize: "22px",

                fontWeight: "700",

                marginBottom: "14px",
              }}
            >
              {
                selectedTask.title
              }
            </h2>

            <p
              style={{
                color: "#9ca3af",

                fontSize: "12px",

                lineHeight: "24px",

                marginBottom: "18px",
              }}
            >
              {
                selectedTask.description
              }
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
                {
                  selectedTask.instructions
                }
              </p>

            </div>

            {/* PROOF */}
            <textarea
              placeholder="Submit proof link here..."

              value={proof}

              onChange={(e) =>
                setProof(
                  e.target.value
                )
              }

              style={{
                width: "100%",

                minHeight: "120px",

                padding: "16px",

                borderRadius: "18px",

                border:
                  "1px solid rgba(255,255,255,0.06)",

                background:
                  "rgba(255,255,255,0.04)",

                color: "white",

                fontSize: "13px",

                outline: "none",

                resize: "none",

                marginBottom: "18px",
              }}
            />

            {/* ACTIONS */}
            <div
              style={{
                display: "flex",

                gap: "12px",
              }}
            >

              <button
                onClick={() =>
                  setSelectedTask(
                    null
                  )
                }

                style={{
                  flex: 1,

                  padding: "16px",

                  border: "none",

                  borderRadius:
                    "18px",

                  background:
                    "rgba(239,68,68,0.10)",

                  color: "#f87171",

                  fontWeight: "700",

                  cursor: "pointer",
                }}
              >
                Reject
              </button>

              <button
                onClick={
                  submitTask
                }

                style={{
                  flex: 1,

                  padding: "16px",

                  border: "none",

                  borderRadius:
                    "18px",

                  background:
                    "linear-gradient(135deg,#8b5cf6,#7c3aed)",

                  color: "white",

                  fontWeight: "700",

                  cursor: "pointer",
                }}
              >
                Submit Task
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Tasks;