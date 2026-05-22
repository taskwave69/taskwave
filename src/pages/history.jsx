import { useEffect, useState } from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import {
  auth,
  db
} from "../firebase";

import Sidebar from "../components/Sidebar";

function History() {

  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {

    const fetchSubmissions = async () => {

      const user = auth.currentUser;

      if (!user) return;

      const querySnapshot =
        await getDocs(collection(db, "submissions"));

      const userSubmissions = [];

      querySnapshot.forEach((doc) => {

        const data = doc.data();

        if (data.userId === user.uid) {

          userSubmissions.push({
            id: doc.id,
            ...data
          });

        }

      });

      setSubmissions(userSubmissions);

    };

    fetchSubmissions();

  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold">
          Submission History
        </h1>

        <p className="text-zinc-400 mt-3">
          Track your submitted tasks.
        </p>

        <div className="grid grid-cols-1 gap-6 mt-10">

          {submissions.map((submission) => (

            <div
              key={submission.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
            >

              <p className="text-cyan-400 font-bold">
                Proof
              </p>

              <a
                href={submission.proof}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline break-all mt-2 block"
              >
                Open Proof
              </a>

              <p className="text-cyan-400 font-bold mt-6">
                Reward
              </p>

              <p className="mt-2">
                ${submission.reward}
              </p>

              <p className="text-cyan-400 font-bold mt-6">
                Status
              </p>

              <p className="mt-2 capitalize">
                {submission.status}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default History;