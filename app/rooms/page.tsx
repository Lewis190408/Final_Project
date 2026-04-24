"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getRooms, createBooking, getBookings } from "../lib/store";

export default function StudentPage() {
  const router = useRouter();
  const [view, setView] = useState<"available" | "my">("available");
  const [myBookings, setMyBookings] = useState<any[]>([]);
  const studentId = "68101123";

  useEffect(() => {
    const interval = setInterval(
      () =>
        setMyBookings(getBookings().filter((b) => b.studentId === studentId)),
      1000,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-10 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800">UniDorm</h1>
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-200 p-1 rounded-lg">
            <button
              onClick={() => setView("available")}
              className={`px-4 py-2 rounded-md text-sm font-bold ${view === "available" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}
            >
              Available
            </button>
            <button
              onClick={() => setView("my")}
              className={`px-4 py-2 rounded-md text-sm font-bold ${view === "my" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}
            >
              My Bookings
            </button>
          </div>
          <button
            onClick={() => router.push("/login")}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {view === "available" ? (
          <div className="grid md:grid-cols-2 gap-6">
            {getRooms().map((r) => (
              <div
                key={r.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
              >
                <h3 className="text-xl font-bold">Room {r.roomNumber}</h3>
                <p className="text-slate-500 mb-4">
                  {r.type} • {r.furniture} • {Number(r.price).toLocaleString()}{" "}
                  THB
                </p>
                <button
                  onClick={() => {
                    createBooking({
                      id: Date.now(),
                      studentId,
                      roomNumber: r.roomNumber,
                      type: r.type,
                      furniture: r.furniture,
                      price: r.price,
                      status: "Pending",
                    });
                    setView("my");
                  }}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            {myBookings.map((b) => (
              <div
                key={b.id}
                className="flex justify-between items-center py-4 border-b last:border-0"
              >
                <div>
                  <p className="font-bold text-lg">Room {b.roomNumber}</p>
                  <p className="text-sm text-slate-500">
                    {b.type} • {b.furniture} •{" "}
                    {Number(b.price).toLocaleString()} THB
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${b.status === "Approved" ? "bg-green-100 text-green-700" : b.status === "Rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}
                >
                  {b.status}
                </span>
              </div>
            ))}
            {myBookings.length === 0 && (
              <p className="text-slate-400 italic">No bookings yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
