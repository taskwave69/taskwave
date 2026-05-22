import { useEffect, useState } from "react";

import {
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc
} from "firebase/firestore";

import { auth, db } from "../firebase";

import Sidebar from "../components/Sidebar";

function Dashboard() {

  const [userData, setUserData] = useState(null);

  useEffect(() => {

    const fetchData = async () => {

      const user = auth.currentUser;

      if (!user) return;

      const userRef = doc(db, "users", user.uid);

      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return;

      const data = userSnap.data();

      // Check approved submissions
      const submissionSnapshot =
        await getDocs(collection(db, "submissions"));

      let withdrawableAdd = 0;

      for (const submissionDoc of submissionSnapshot.docs) {

        const submission = submissionDoc.data();

        if (
          submission.userId === user.uid &&
          submission.status === "approved" &&
          submission.approvedAt
        ) {

          const approvedTime =
            submission.approvedAt.toDate().getTime();

          const now = Date.now();

          const hoursPassed =
            (now - approvedTime) / (1000 * 60 * 60);

          if (hoursPassed >= 24) {

            withdrawableAdd += submission.reward;

            // Mark as released
            await updateDoc(
              doc(db, "submissions", submissionDoc.id),
              {
                status: "released"
              }
            );
          }
        }
      }

      if (withdrawableAdd > 0) {

        await updateDoc(userRef, {

          pending:
            data.pending - withdrawableAdd,

          withdrawable:
            data.withdrawable + withdrawableAdd

        });

        data.pending -= withdrawableAdd;

        data.withdrawable += withdrawableAdd;

      }

      setUserData(data);

    };

    fetchData();

  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold">
          Dashboard
        </h1>

        <p className="text-zinc-400 mt-3">
          Welcome back to TaskWave.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <p className="text-zinc-400">
              Pending
            </p>

            <h2 className="text-4xl font-bold text-cyan-400 mt-4">
              ${userData?.pending || 0}
            </h2>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <p className="text-zinc-400">
              Withdrawable
            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-4">
              ${userData?.withdrawable || 0}
            </h2>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <p className="text-zinc-400">
              Total Earnings
            </p>

            <h2 className="text-4xl font-bold text-yellow-400 mt-4">
              ${userData?.totalEarnings || 0}
            </h2>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;