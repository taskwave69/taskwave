// src/pages/Tasks.jsx

import Sidebar from "../components/Sidebar";

function Tasks() {

  const tasks = [

    {
      title: "Instagram Follow",
      reward: "$2.00",
      category: "Social Task",
    },

    {
      title: "Twitter Repost",
      reward: "$1.50",
      category: "Promotion",
    },

    {
      title: "Discord Invite",
      reward: "$3.00",
      category: "Community",
    },

    {
      title: "YouTube Like",
      reward: "$1.20",
      category: "Video Task",
    },

  ];

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

        paddingLeft: "22px",

        paddingRight: "22px",

        paddingBottom: "40px",
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
            fontSize: "34px",

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

            fontSize: "14px",

            lineHeight: "26px",

            maxWidth: "420px",
          }}
        >
          Complete premium social
          tasks and earn instantly
          through TaskWave.
        </p>

      </div>

      {/* STATS CARD */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#8b5cf6,#7c3aed)",

          borderRadius: "24px",

          padding: "22px",

          marginBottom: "22px",

          boxShadow:
            "0 0 35px rgba(139,92,246,0.20)",
        }}
      >

        <p
          style={{
            fontSize: "13px",

            opacity: 0.82,

            marginBottom: "10px",
          }}
        >
          Available Rewards
        </p>

        <h2
          style={{
            fontSize: "40px",

            fontWeight: "800",

            letterSpacing: "-2px",

            marginBottom: "10px",
          }}
        >
          $7.70
        </h2>

        <p
          style={{
            fontSize: "14px",

            opacity: 0.9,

            lineHeight: "26px",
          }}
        >
          Complete tasks below
          and increase your balance.
        </p>

      </div>

      {/* TASKS */}
      <div
        style={{
          display: "grid",

          gap: "16px",
        }}
      >

        {tasks.map((task, index) => (

          <div
            key={index}
            style={{
              background:
                "rgba(255,255,255,0.03)",

              border:
                "1px solid rgba(255,255,255,0.05)",

              borderRadius: "22px",

              padding: "18px",

              backdropFilter:
                "blur(18px)",

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
                  fontSize: "17px",

                  fontWeight: "700",

                  marginBottom: "6px",
                }}
              >
                {task.title}
              </p>

              <p
                style={{
                  color: "#9ca3af",

                  fontSize: "13px",
                }}
              >
                {task.category}
              </p>

            </div>

            {/* RIGHT */}
            <div
              style={{
                textAlign: "right",
              }}
            >

              <p
                style={{
                  color: "#8b5cf6",

                  fontSize: "20px",

                  fontWeight: "800",

                  marginBottom: "10px",
                }}
              >
                {task.reward}
              </p>

              <button
                style={{
                  border: "none",

                  padding:
                    "10px 16px",

                  borderRadius:
                    "14px",

                  background:
                    "linear-gradient(135deg,#8b5cf6,#7c3aed)",

                  color: "white",

                  fontSize: "13px",

                  fontWeight: "600",

                  cursor: "pointer",

                  boxShadow:
                    "0 0 20px rgba(139,92,246,0.18)",
                }}
              >
                Claim
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Tasks;