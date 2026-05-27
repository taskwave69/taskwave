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
  getDoc,
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

        // ONLY AVAILABLE TASKS
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

  // COPY TITLE
  const copyTitle =
    async () => {

      try {

        await navigator.clipboard.writeText(
          selectedTask.title
        );

        alert("Title copied");

      } catch (error) {

        console.log(error);

      }
    };

  // COPY DESCRIPTION
  const copyDescription =
    async () => {

      try {

        await navigator.clipboard.writeText(
          selectedTask.description
        );

        alert(
          "Description copied"
        );

      } catch (error) {

        console.log(error);

      }
    };

  // OPEN IMAGE
  const openImage =
    () => {

      if (
        selectedTask.image
      ) {

        window.open(
          selectedTask.image,
          "_blank"
        );
      }
    };

  // REJECT TASK
  const rejectTask =
    () => {

      setSelectedTask(null);

      setProof("");

    };

  // SUBMIT TASK
  const submitTask =
    async () => {

      try {

        if (!proof) {

          alert(
            "Submit proof first"
          );

          return;
        }

        const user =
          auth.currentUser;

        // SAVE CLAIM
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

            title:
              selectedTask.title,

            subreddit:
              selectedTask.subreddit,

            status:
              "pending",

            createdAt:
              Date.now(),
          }
        );

        // UPDATE TASK
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

        // ADD TO PENDING BALANCE
        const userRef =
          doc(
            db,
            "users",
            user.uid
          );

        const userSnap =
          await getDoc(
            userRef
          );

        const userData =
          userSnap.data();

        const currentPending =
          userData
            ?.pendingBalance || 0;

        await updateDoc(
          userRef,
          {
            pendingBalance:
              currentPending +
              Number(
                selectedTask.amount
              ),
          }
        );

        // REMOVE FROM TASK LIST
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
          marginBottom: "26px",
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

              borderRadius: "24px",

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
              No tasks available right now.
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

              backdropFilter:
                "blur(18px)",
            }}
          >

            {/* LEFT */}
            <div>

              <p
                style={{
                  color: "#8b5cf6",

                  fontSize: "11px",

                  marginBottom: "6px",

                  fontWeight: "600",
                }}
              >
                {task.subreddit}
              </p>

              <h2
                style={{
                  fontSize: "15px",

                  fontWeight: "700",

                  marginBottom: "6px",

                  letterSpacing: "-0.3px",
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

            {/* CLAIM */}
            <button
              onClick={() =>
                openTask(task)
              }

              style={{
                border: "none",

                padding:
                  "12px 18px",

                borderRadius:
                  "14px",

                background:
                  "linear-gradient(135deg,#8b5cf6,#7c3aed)",

                color: "white",

                fontSize: "12px",

                fontWeight: "700",

                cursor: "pointer",

                boxShadow:
                  "0 0 25px rgba(139,92,246,0.14)",
              }}
            >
              Claim
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
              "rgba(0,0,0,0.75)",

            backdropFilter:
              "blur(8px)",

            overflowY: "auto",

            padding: "24px",

            zIndex: 5000,
          }}
        >

          <div
            style={{
              width: "100%",

              maxWidth: "720px",

              margin: "0 auto",

              background:
                "#0f172a",

              border:
                "1px solid rgba(255,255,255,0.06)",

              borderRadius: "32px",

              padding: "26px",
            }}
          >

            {/* SUBREDDIT */}
            <p
              style={{
                color: "#8b5cf6",

                fontSize: "11px",

                marginBottom: "10px",

                fontWeight: "700",

                letterSpacing: "1px",
              }}
            >
              {
                selectedTask.subreddit
              }
            </p>

            {/* TITLE */}
            <h1
              style={{
                fontSize: "30px",

                fontWeight: "800",

                lineHeight: "42px",

                letterSpacing: "-1px",

                marginBottom: "18px",
              }}
            >
              {
                selectedTask.title
              }
            </h1>

            {/* COPY BUTTONS */}
            <div
              style={{
                display: "flex",

                gap: "12px",

                marginBottom: "22px",

                flexWrap: "wrap",
              }}
            >

              <button
                onClick={copyTitle}

                style={actionBtn}
              >
                Copy Title
              </button>

              <button
                onClick={
                  copyDescription
                }

                style={actionBtn}
              >
                Copy Description
              </button>

              {selectedTask.image && (

                <button
                  onClick={openImage}

                  style={actionBtn}
                >
                  Open Image
                </button>

              )}

            </div>

            {/* DESCRIPTION */}
            <div
              style={detailCard}
            >

              <p style={detailTitle}>
                DESCRIPTION
              </p>

              <p style={detailText}>
                {
                  selectedTask.description
                }
              </p>

            </div>

            {/* INSTRUCTIONS */}
            <div
              style={detailCard}
            >

              <p style={detailTitle}>
                INSTRUCTIONS
              </p>

              <p style={detailText}>
                {
                  selectedTask.instructions
                }
              </p>

            </div>

            {/* REWARD */}
            <div
              style={{
                background:
                  "linear-gradient(135deg,#8b5cf6,#7c3aed)",

                borderRadius: "24px",

                padding: "24px",

                marginBottom: "22px",
              }}
            >

              <p
                style={{
                  fontSize: "12px",

                  opacity: 0.85,

                  marginBottom: "10px",
                }}
              >
                TASK REWARD
              </p>

              <h2
                style={{
                  fontSize: "40px",

                  fontWeight: "800",

                  letterSpacing: "-2px",
                }}
              >
                $
                {
                  selectedTask.amount
                }
              </h2>

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

                minHeight: "140px",

                padding: "18px",

                borderRadius: "22px",

                border:
                  "1px solid rgba(255,255,255,0.06)",

                background:
                  "rgba(255,255,255,0.04)",

                color: "white",

                fontSize: "13px",

                outline: "none",

                resize: "none",

                marginBottom: "22px",

                lineHeight: "24px",
              }}
            />

            {/* ACTIONS */}
            <div
              style={{
                display: "flex",

                gap: "14px",
              }}
            >

              <button
                onClick={rejectTask}

                style={{
                  flex: 1,

                  padding: "18px",

                  border: "none",

                  borderRadius:
                    "18px",

                  background:
                    "rgba(239,68,68,0.10)",

                  color: "#f87171",

                  fontWeight: "700",

                  fontSize: "13px",

                  cursor: "pointer",
                }}
              >
                Reject Task
              </button>

              <button
                onClick={
                  submitTask
                }

                style={{
                  flex: 1,

                  padding: "18px",

                  border: "none",

                  borderRadius:
                    "18px",

                  background:
                    "linear-gradient(135deg,#8b5cf6,#7c3aed)",

                  color: "white",

                  fontWeight: "700",

                  fontSize: "13px",

                  cursor: "pointer",

                  boxShadow:
                    "0 0 35px rgba(139,92,246,0.16)",
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

const actionBtn = {

  border: "none",

  padding:
    "12px 16px",

  borderRadius:
    "14px",

  background:
    "rgba(139,92,246,0.12)",

  color: "#c4b5fd",

  fontSize: "12px",

  fontWeight: "700",

  cursor: "pointer",
};

const detailCard = {

  background:
    "rgba(255,255,255,0.03)",

  border:
    "1px solid rgba(255,255,255,0.05)",

  borderRadius: "22px",

  padding: "20px",

  marginBottom: "18px",
};

const detailTitle = {

  color: "#c4b5fd",

  fontSize: "11px",

  marginBottom: "12px",

  letterSpacing: "1px",

  fontWeight: "700",
};

const detailText = {

  color: "#d1d5db",

  fontSize: "13px",

  lineHeight: "28px",
};

export default Tasks;