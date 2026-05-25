// src/pages/Admin.jsx

import { useState } from "react";

import Sidebar from "../components/Sidebar";

import {
  collection,
  addDoc,
  updateDoc,
  doc
} from "firebase/firestore";

import { db } from "../firebase";

function Admin() {

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [image, setImage] =
    useState("");

  const [instructions, setInstructions] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [userId, setUserId] =
    useState("");

  const [walletAmount, setWalletAmount] =
    useState("");

  const handleAddTask =
    async () => {

      if (
        !title ||
        !description ||
        !instructions ||
        !amount
      ) {

        alert("Fill all fields");

        return;
      }

      try {

        await addDoc(
          collection(db, "tasks"),
          {

            title,

            description,

            image,

            instructions,

            amount,

            status: "available",

            claimedBy: "",

            submitted: false,

            approved: false,

            rejected: false,

            createdAt:
              Date.now(),
          }
        );

        alert("Task Added");

        setTitle("");
        setDescription("");
        setImage("");
        setInstructions("");
        setAmount("");

      } catch (error) {

        console.log(error);

      }
    };

  const handleWalletUpdate =
    async () => {

      if (
        !userId ||
        !walletAmount
      ) {

        alert("Fill fields");

        return;
      }

      try {

        await updateDoc(
          doc(db, "users", userId),
          {

            balance:
              Number(
                walletAmount
              ),
          }
        );

        alert(
          "Wallet Updated"
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
          marginBottom: "28px",
        }}
      >

        <h1
          style={{
            fontSize: "34px",

            fontWeight: "800",

            marginBottom: "8px",
          }}
        >
          Admin Panel
        </h1>

        <p
          style={{
            color: "#9ca3af",

            fontSize: "14px",

            lineHeight: "26px",
          }}
        >
          Manage tasks,
          worker approvals
          and wallet balances.
        </p>

      </div>

      {/* ADD TASK CARD */}
      <div
        style={cardStyle}
      >

        <h2
          style={titleStyle}
        >
          Add Task
        </h2>

        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          style={textareaStyle}
        />

        <input
          placeholder="Image Link"
          value={image}
          onChange={(e) =>
            setImage(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) =>
            setInstructions(
              e.target.value
            )
          }
          style={textareaStyle}
        />

        <input
          placeholder="Task Amount"
          value={amount}
          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <button
          onClick={
            handleAddTask
          }
          style={buttonStyle}
        >
          Add Task
        </button>

      </div>

      {/* WALLET SECTION */}
      <div
        style={{
          ...cardStyle,
          marginTop: "22px",
        }}
      >

        <h2
          style={titleStyle}
        >
          Update User Wallet
        </h2>

        <input
          placeholder="User ID"
          value={userId}
          onChange={(e) =>
            setUserId(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          placeholder="New Balance"
          value={walletAmount}
          onChange={(e) =>
            setWalletAmount(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <button
          onClick={
            handleWalletUpdate
          }
          style={buttonStyle}
        >
          Update Wallet
        </button>

      </div>

    </div>
  );
}

const cardStyle = {

  background:
    "rgba(255,255,255,0.03)",

  border:
    "1px solid rgba(255,255,255,0.05)",

  borderRadius: "24px",

  padding: "22px",

  backdropFilter:
    "blur(18px)",

  display: "flex",

  flexDirection: "column",

  gap: "16px",
};

const titleStyle = {

  fontSize: "20px",

  fontWeight: "700",

  marginBottom: "8px",
};

const inputStyle = {

  width: "100%",

  padding: "16px",

  borderRadius: "16px",

  border:
    "1px solid rgba(255,255,255,0.06)",

  background:
    "rgba(255,255,255,0.04)",

  color: "white",

  fontSize: "14px",

  outline: "none",
};

const textareaStyle = {

  width: "100%",

  padding: "16px",

  borderRadius: "16px",

  border:
    "1px solid rgba(255,255,255,0.06)",

  background:
    "rgba(255,255,255,0.04)",

  color: "white",

  fontSize: "14px",

  outline: "none",

  minHeight: "120px",

  resize: "none",
};

const buttonStyle = {

  width: "100%",

  padding: "16px",

  border: "none",

  borderRadius: "18px",

  background:
    "linear-gradient(135deg,#8b5cf6,#7c3aed)",

  color: "white",

  fontSize: "15px",

  fontWeight: "700",

  cursor: "pointer",

  boxShadow:
    "0 0 25px rgba(139,92,246,0.18)",
};

export default Admin;