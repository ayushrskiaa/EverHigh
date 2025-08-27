import React, { useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: 1001, user: "John Doe", total: 8990, status: "Processing" },
    { id: 1002, user: "Jane Smith", total: 4990, status: "Processing" },
    { id: 1003, user: "Sam Wilson", total: 2999, status: "Shipped" },
    { id: 1004, user: "Emma Johnson", total: 7590, status: "Processing" },
    { id: 1005, user: "Liam Brown", total: 12990, status: "Cancelled" },
    { id: 1006, user: "Olivia Davis", total: 6500, status: "Processing" },
    { id: 1007, user: "Noah Miller", total: 4300, status: "Processing" },
    { id: 1008, user: "Sophia Wilson", total: 8200, status: "Processing" },
    { id: 1009, user: "James Lee", total: 2990, status: "Shipped" },
    { id: 1010, user: "Ava Martinez", total: 9990, status: "Processing" },
  ]);

  const markShipped = (id) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: "Shipped" } : o)));
  };

  const cancelOrder = (id) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: "Cancelled" } : o)));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.user}</td>
                <td className="px-4 py-2">₹{order.total}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => markShipped(order.id)}
                    disabled={order.status === "Shipped" || order.status === "Cancelled"}
                    className={`px-3 py-1 rounded text-white ${
                      order.status === "Shipped" || order.status === "Cancelled"
                        ? "bg-green-300 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    Mark Shipped
                  </button>
                  <button
                    onClick={() => cancelOrder(order.id)}
                    disabled={order.status === "Cancelled" || order.status === "Shipped"}
                    className={`px-3 py-1 rounded text-white ${
                      order.status === "Cancelled" || order.status === "Shipped"
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gray-400 hover:bg-gray-500"
                    }`}
                  >
                    Cancel
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

export default Orders;