"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("student");
  const router = useRouter();

  const handleLogin = () => {
    const user = { username, role };
    localStorage.setItem("user", JSON.stringify(user));
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Đăng nhập</h1>
      <input
        type="text"
        placeholder="Tên đăng nhập"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 border rounded mb-2 w-64"
      />
      <input
        type="text"
        placeholder="Nhập mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded mb-2 w-64"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="p-2 border rounded mb-4 w-64"
      >
        <option value="student">Sinh viên/Giảng viên</option>
        <option value="organizer">Ban tổ chức</option>
        <option value="admin">Admin</option>
      </select>
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
      >
        Đăng nhập
      </button>
    </div>
  );
}
