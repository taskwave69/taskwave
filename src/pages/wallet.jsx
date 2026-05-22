import { useEffect, useState } from "react";

import {
  auth,
  db
} from "../firebase";

import {
  doc,
  getDoc,
  addDoc,
  collection,
  updateDoc
} from "firebase/firestore";

import Sidebar from "../components/Sidebar";

function Wallet() {

  const [userData, setUserData] = useState(null);

  const [amount, setAmount] = useState("");

  const [upiId, setUpiId] = useState("");

  const [binanceId, setBinanceId] = useState("");

  useEffect(() => {

    const fetchUser = async () => {

      const user = auth.currentUser;

      if (!user) return;

      const userRef =
        doc(db, "users", user.uid);

      const userSnap =
        await getDoc(userRef);

      if (userSnap.exists()) {

        setUserData(userSnap.data());

      }

    };

    fetchUser();

  }, []);

  const requestWithdrawal = async () => {

    const user = auth.currentUser;

    if (!user || !userData) return;

    const withdrawAmount =
      Number(amount);

    if (withdrawAmount <= 0) {

      alert("Enter valid amount");

      return;

    }

    if (
      withdrawAmount >
      userData.withdrawable
    ) {

      alert("Insufficient balance");

      return;

    }

    if (!upiId && !binanceId) {

      alert("Enter UPI or Binance ID");

      return;

    }

    // Create request
    await addDoc(
      collection(db, "withdrawRequests"),
      {

        userId: user.uid,

        amount: withdrawAmount,

        upiId: upiId,

        binanceId: binanceId,

        status: "pending",

        createdAt: new Date()

      }
    );

    // Deduct balance
    const userRef =
      doc(db, "users", user.uid);

    await updateDoc(userRef, {

      withdrawable:
        userData.withdrawable -
        withdrawAmount

    });

    alert("Withdrawal requested!");

    setAmount("");

    setUpiId("");

    setBinanceId("");

  };

  return (
    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold">
          Wallet
        </h1>

        <p className="text-zinc-400 mt-3">
          Manage your earnings and withdrawals.
        </p>

        {/* Balance Cards */}
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

        {/* Withdraw Box */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mt-10 max-w-2xl">

          <h2 className="text-3xl font-bold">
            Request Withdrawal
          </h2>

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="w-full bg-zinc-800 rounded-2xl p-4 mt-6 outline-none"
          />

          <input
            type="text"
            placeholder="UPI ID"
            value={upiId}
            onChange={(e) =>
              setUpiId(e.target.value)
            }
            className="w-full bg-zinc-800 rounded-2xl p-4 mt-4 outline-none"
          />

          <input
            type="text"
            placeholder="Binance ID"
            value={binanceId}
            onChange={(e) =>
              setBinanceId(e.target.value)
            }
            className="w-full bg-zinc-800 rounded-2xl p-4 mt-4 outline-none"
          />

          <button
            onClick={requestWithdrawal}
            className="mt-6 bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-3 rounded-xl font-bold transition"
          >
            Request Withdrawal
          </button>

        </div>

      </div>

    </div>
  );
}

export default Wallet;