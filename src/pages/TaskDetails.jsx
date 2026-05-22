import { useEffect, useState } from "react";

import {
  doc,
  getDoc,
  collection,
  addDoc
} from "firebase/firestore";

import {
  useParams
} from "react-router-dom";

import {
  db,
  auth
} from "../firebase";

import Sidebar from "../components/Sidebar";

function TaskDetails() {

  const { id } = useParams();

  const [task, setTask] = useState(null);

  const [proof, setProof] = useState("");

  useEffect(() => {

    const fetchTask = async () => {

      const docRef = doc(db, "tasks", id);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        setTask(docSnap.data());

      }
    };

    fetchTask();

  }, [id]);

  const copyText = (text) => {

    navigator.clipboard.writeText(text);

    alert("Copied!");

  };

  const submitProof = async () => {

    const user = auth.currentUser;

    if (!user) return;

    await addDoc(collection(db, "submissions"), {

      userId: user.uid,

      taskId: id,

      proof: proof,

      reward: task.reward,

      status: "pending",

      submittedAt: new Date()

    });

    alert("Proof submitted successfully!");

    setProof("");

  };

  if (!task) {

    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="flex-1 p-6 md:p-10 mt-16 md:mt-0">

        <h1 className="text-4xl md:text-5xl font-bold">
          Task Details
        </h1>

        {/* Title */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mt-10">

          <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">

            <h2 className="text-2xl font-bold break-all">
              {task.title}
            </h2>

            <button
              onClick={() => copyText(task.title)}
              className="bg-cyan-400 text-black px-4 py-2 rounded-xl font-bold"
            >
              Copy
            </button>

          </div>

        </div>

        {/* Description */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mt-6">

          <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">

            <p className="text-zinc-300 break-all">
              {task.description}
            </p>

            <button
              onClick={() => copyText(task.description)}
              className="bg-cyan-400 text-black px-4 py-2 rounded-xl font-bold"
            >
              Copy
            </button>

          </div>

        </div>

        {/* Image Preview */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mt-6">

          <h2 className="text-xl font-bold">
            Task Image
          </h2>

          <img
            src={task.imageLink}
            alt="Task"
            className="w-full max-w-md rounded-2xl mt-6 border border-zinc-700"
          />

          <a
            href={task.imageLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 bg-cyan-400 hover:bg-cyan-300 text-black px-5 py-3 rounded-xl font-bold transition"
          >
            Open Full Image
          </a>

        </div>

        {/* Subreddit */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mt-6">

          <h2 className="text-xl font-bold">
            Subreddit Link
          </h2>

          <a
            href={task.subreddit}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 underline mt-3 block break-all"
          >
            Open Subreddit
          </a>

        </div>

        {/* Instructions */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mt-6">

          <h2 className="text-xl font-bold">
            Instructions
          </h2>

          <p className="text-zinc-300 mt-4 whitespace-pre-line">
            {task.instructions}
          </p>

        </div>

        {/* Submit Proof */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mt-6">

          <h2 className="text-2xl font-bold">
            Submit Proof
          </h2>

          <textarea
            placeholder="Paste proof link here..."
            value={proof}
            onChange={(e) => setProof(e.target.value)}
            className="w-full bg-zinc-800 rounded-2xl p-4 mt-6 outline-none min-h-[120px]"
          />

          <button
            onClick={submitProof}
            className="mt-6 bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-3 rounded-xl font-bold transition"
          >
            Submit Proof
          </button>

        </div>

      </div>

    </div>
  );
}

export default TaskDetails;