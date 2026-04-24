"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getRooms,
  addRoom,
  deleteRoom,
  updateRoom,
  getBookings,
  updateBookingStatus,
} from "../../lib/store";

export default function AdminDashboard() {
  const router = useRouter();
  const [roomList, setRoomList] = useState(getRooms());
  const [bookingRequests, setBookingRequests] = useState(getBookings());

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    roomNumber: "",
    type: "Single Room",
    furniture: "Fully Furnished",
    price: "",
  });

  const refresh = () => {
    setRoomList(getRooms());
    setBookingRequests(getBookings());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && editId) {
      updateRoom(editId, formData);
    } else {
      addRoom({ id: Date.now(), ...formData });
    }
    setIsEditing(false);
    setEditId(null);
    setFormData({
      roomNumber: "",
      type: "Single Room",
      furniture: "Fully Furnished",
      price: "",
    });
    refresh();
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
        <button
          onClick={() => router.push("/login")}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold"
        >
          Logout
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ROOM MANAGEMENT FORM */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-6 text-blue-600">
            {isEditing ? "Edit Room" : "Add New Room"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full p-2 border rounded-lg"
              placeholder="Room Number"
              value={formData.roomNumber}
              onChange={(e) =>
                setFormData({ ...formData, roomNumber: e.target.value })
              }
              required
            />
            <select
              className="w-full p-2 border rounded-lg"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option>Single Room</option>
              <option>Studio Room</option>
            </select>
            <select
              className="w-full p-2 border rounded-lg"
              value={formData.furniture}
              onChange={(e) =>
                setFormData({ ...formData, furniture: e.target.value })
              }
            >
              <option>Fully Furnished</option>
              <option>Basic Type</option>
            </select>
            <input
              type="number"
              className="w-full p-2 border rounded-lg"
              placeholder="Price (THB)"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">
              {isEditing ? "Update Room" : "Create Room"}
            </button>
          </form>
        </div>

        {/* LISTS SECTION */}
        <div className="lg:col-span-2 space-y-10">
          {/* CURRENT ROOMS */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-700">
              Current Rooms
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {roomList.map((r) => (
                <div
                  key={r.id}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold">Room {r.roomNumber}</p>
                    <p className="text-xs text-slate-500">
                      {r.type} • {r.furniture} •{" "}
                      {Number(r.price).toLocaleString()} THB
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setEditId(r.id);
                        setFormData(r);
                      }}
                      className="text-blue-500 font-bold text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteRoom(r.id);
                        refresh();
                      }}
                      className="text-red-500 font-bold text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BOOKING REQUESTS */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-700">
              Booking Requests
            </h2>
            {bookingRequests.map((b) => (
              <div
                key={b.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-slate-800">
                      Student: {b.studentId}
                    </p>
                    <p className="text-sm font-bold text-blue-600">
                      Room {b.roomNumber}
                    </p>
                    <p className="text-xs text-slate-500">
                      {b.type} • {b.furniture} •{" "}
                      {Number(b.price).toLocaleString()} THB
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      b.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : b.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => {
                      updateBookingStatus(b.id, "Approved");
                      refresh();
                    }}
                    className="bg-green-600 text-white px-3 py-1 rounded text-xs font-bold"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      updateBookingStatus(b.id, "Rejected");
                      refresh();
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
