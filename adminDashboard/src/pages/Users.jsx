import React, { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([
    { id: "U001", name: "John Doe", email: "john@example.com", role: "User", status: "Active" },
    { id: "U002", name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
    { id: "U003", name: "Sam Wilson", email: "sam@example.com", role: "Admin", status: "Active" },
    { id: "U004", name: "Emma Johnson", email: "emma@example.com", role: "User", status: "Blocked" },
    { id: "U005", name: "Liam Brown", email: "liam@example.com", role: "User", status: "Active" },
    { id: "U006", name: "Olivia Davis", email: "olivia@example.com", role: "User", status: "Active" },
    { id: "U007", name: "Noah Miller", email: "noah@example.com", role: "User", status: "Active" },
    { id: "U008", name: "Sophia Wilson", email: "sophia@example.com", role: "User", status: "Active" },
    { id: "U009", name: "James Lee", email: "james@example.com", role: "User", status: "Active" },
    { id: "U010", name: "Ava Martinez", email: "ava@example.com", role: "User", status: "Active" },
  ]);

  const blockUser = (id) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: "Blocked" } : u)));
  };

  const promoteUser = (id) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, role: "Admin" } : u)));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">User ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">{user.status}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => blockUser(user.id)}
                    disabled={user.status === "Blocked"}
                    className={`px-3 py-1 rounded text-white ${
                      user.status === "Blocked"
                        ? "bg-red-300 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    Block
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
