"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const events = [
  { id: 1, title: "Hội thảo Công nghệ AI", date: "2025-03-10", location: "Hội trường A", description: "Hội thảo về công nghệ AI và ứng dụng trong thực tế.", speaker: "TS. Nguyễn Văn A" },
  { id: 2, title: "Giao lưu CLB Lập trình", date: "2025-03-15", location: "Phòng 202", description: "Buổi giao lưu, chia sẻ kinh nghiệm lập trình.", speaker: "CLB Lập trình" },
  { id: 3, title: "Workshop React Native", date: "2025-03-20", location: "Online", description: "Hướng dẫn lập trình ứng dụng di động với React Native.", speaker: "Chuyên gia React Native" },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  const handleRegister = (eventId) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents([...registeredEvents, eventId]);
      alert("Đăng ký thành công!");
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  const upcomingEvents = filteredEvents.filter(event => event.date >= today);
  const pastEvents = filteredEvents.filter(event => event.date < today);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Danh sách sự kiện</h1>
        {user ? (
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded">
            Đăng xuất ({user.username})
          </button>
        ) : (
          <div className="flex gap-2">
          <Link href="/login">
            <button className="px-4 py-2 bg-blue-500 hover:bg-green-700 text-white rounded">
              Đăng nhập
            </button>
          </Link>
          <Link href="/register">
            <button className="px-4 py-2 bg-blue-500 hover:bg-green-700 text-white rounded">
              Đăng ký
            </button>
          </Link>
          </div>
          
        )}
      </div>

      <input
        type="text"
        placeholder="Tìm kiếm sự kiện..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {user?.role === "organizer" && (
        <button className="mb-4 px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded">
          + Tạo sự kiện
        </button>
      )}

      {selectedEvent ? (
        <div className="p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold">{selectedEvent.title}</h2>
          <p className="text-gray-600">Ngày: {selectedEvent.date}</p>
          <p className="text-gray-600">Địa điểm: {selectedEvent.location}</p>
          <p className="text-gray-600">Diễn giả: {selectedEvent.speaker}</p>
          <p className="text-gray-600">Mô tả: {selectedEvent.description}</p>
          <button
            onClick={() => setSelectedEvent(null)}
            className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
          >
            Đóng
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mt-6">Sự kiện sắp diễn ra</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div key={event.id} className="p-4 border rounded-lg shadow-md cursor-pointer" onClick={() => handleEventClick(event)}>
                  <h2 className="text-xl font-semibold">{event.title}</h2>
                  <p className="text-gray-600">Ngày: {event.date}</p>
                  <p className="text-gray-600">Địa điểm: {event.location}</p>
                  {user?.role === "student" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRegister(event.id);
                      }}
                      className={`mt-2 px-4 py-2 rounded text-white ${registeredEvents.includes(event.id) ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"}`}
                      disabled={registeredEvents.includes(event.id)}
                    >
                      {registeredEvents.includes(event.id) ? "Đã đăng ký" : "Đăng ký"}
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">Không có sự kiện nào.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
